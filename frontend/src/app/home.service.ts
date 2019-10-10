import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
declare var moment
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  dateinit : string = ''
  dateEnd : string = ''
  storage: any = window.localStorage;
  constructor(
    private http: HttpClient 
  ) {
    this.dateinit = this.storage.getItem('init') || '';
    this.dateEnd = this.storage.getItem('end') || '';
  }
  
  getAllCalendars( token ){
    var url = `${ environment.apiUrl }/calendar/api?token=${ token }`
    return this.http.get( url )
  }

  saveDate( init, end ) {
    this.storage.setItem('init', init );
    this.storage.setItem('end', end );
  }

  betweenHours(h0, h1, mins) {
    mins = this.toMins(mins)
    return this.toMins(h0) <= mins && mins <= this.toMins(h1);
  }
   toMins(h) {
    var b = h.split(':')
    return b[0]*60 + +b[1];
  }

  verifyDates( data ){
    let okEvent = []
    let badEvent = []
    for( const event of data ){
      let date = event.start.dateTime.split('T')[1].split('-')[0]
      let dateEnd = event.end.dateTime.split('T')[1].split('-')[0]
      if( 
        this.betweenHours(this.dateinit, this.dateEnd, date.slice(0, -3) )
        || this.betweenHours(this.dateinit, this.dateEnd, dateEnd.slice(0, -3) ) 
      ){
        okEvent.push( event )
      }else{
        badEvent.push( event )
      }
    }
    console.log( okEvent )
    console.log( badEvent )
    return {
      okEvent,
      badEvent
    }
  }

  getEvents( token, id  ){
    var url = `${ environment.apiUrl }/events/api?token=${ token }&id=${ id }`
    return this.http.get( url )
  }

}
