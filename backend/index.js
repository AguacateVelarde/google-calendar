const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer( app )
const PORT = +process.env.PORT || 8889
const api = require('./api.js')
const passport = require('passport')
const cookieSession = require('cookie-session')
const cors = require('cors')
app.use( cors() )
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ['hg']
    })
);
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  
app.use( express.json() )
app.get('/', (req, res)=> res.send('Hola mundo'))
app.use( '/api/v1', api )
app.get('*', (req, res)=> res.send('Handler'))
server.on('listening', ()=>{ 
    console.log( `Server running on port ${ PORT }` )
})


server.listen( PORT )