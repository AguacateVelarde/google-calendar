import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  response : any  
  init : string = ''
  end :string = ''
  constructor(
    private homeService : HomeService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() { 
  }

  openCalendar(){
    this.homeService.saveDate( this.init, this.end )
   setTimeout( ()=>  location.href = 'http://localhost:8889/api/v1/auth', 1000 )
  }

}
