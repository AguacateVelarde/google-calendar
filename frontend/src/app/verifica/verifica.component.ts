import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-verifica',
  templateUrl: './verifica.component.html',
  styleUrls: ['./verifica.component.scss']
})
export class VerificaComponent implements OnInit {
  id :any 
  calendarios = []
  okEvent = null
  badEvent = null
  constructor(
    private route: ActivatedRoute,
    private homeService : HomeService,
    private router : Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if( this.id === undefined || this.homeService.dateinit === '' || this.homeService.dateEnd === '' )
    this.router.navigate(['/'])
    
    this.homeService.getAllCalendars(this.id)
    .subscribe( (r:any) =>{
      let datao = r.data.items.filter( x => x.accessRole === "owner")
      this.calendarios = datao
    })
  
  }

  selected( idCalendar ){
    console.log( idCalendar )
    this.homeService.getEvents( this.id, idCalendar ).subscribe( (data:any) =>{
      console.log( data )
      let { okEvent, badEvent } = this.homeService.verifyDates(  data.data  )
      this.okEvent = okEvent
      this.badEvent = badEvent
    })
  }

}
