const { Router } = require('express')
const router = Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const gcal     = require('google-calendar');
var google_calendar = null 

passport.use(new GoogleStrategy({
    clientID: '191467523520-mj4h97cahnaqfb40b0v5o353kufh2l4o.apps.googleusercontent.com',
    clientSecret: 'bYlOuZFf6FKdO9PMNsZ7foRA',
    callbackURL: "http://localhost:8889/api/v1/calendar",
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'] 
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    return done(null, profile);
  }
));


router.get('/auth', passport.authenticate('google'))

router.get('/calendar', 
passport.authenticate('google', { session: true, failureRedirect: '/login' }),
(req, res)=> {
    req.session.access_token = req.user.accessToken;
    res.redirect('http://localhost:4200/verifica/' + req.user.accessToken );
})

router.get( '/calendar/api', 
(req, res)=>{
    if(!req.query.token) 
        return res.status(400).json({
            message : 'UnAuth',
            status_code : 4001
        })
    
    var accessToken = req.query.token
    console.log( accessToken )

    gcal(accessToken).calendarList.list(function(err, data) {
        if(err)
        return res.status(500).json({
            message : 'Server error',
            status_code : 4001,
            err
        })
        return res.json({
            message : 'Ok',
            status_code : 200,
            data 
        })
    });
})



router.get('/events/:calendarId', function(req, res){
  
    if(!req.query.token) 
        return res.status(400).json({
            message : 'UnAuth',
            status_code : 4001
        })

    var accessToken     = req.query.token;
    var calendarId      = req.query.id;
    var now = new Date;
    var utc_timestamp = `${ now.getUTCFullYear() }-${ now.getUTCMonth()+ 1 }-${ now.getUTCDate() }`
    gcal(accessToken).events.list(calendarId, function(err, data) {
      if(err) 
        return res.status(500).json({
            message : 'Server error',
            status_code : 4001,
            err
        })
      var items = 
      data.items.filter( x => x.start &&  x.start.dateTime && x.start.dateTime.includes( utc_timestamp ))
      return res.json({
        message : 'Ok',
        status_code : 200,
        data : items,
        dataclean: data
    })
    });
  });
module.exports = router