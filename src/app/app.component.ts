import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { StatusService } from './_helpers/status.service';
import { JwtResponse } from './model/jwt-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medical-online';

  showHead: boolean = true;

  constructor( private router:Router ){
      //on route change to '/login', set the variable showHead to false
      router.events.forEach((event)=>{
        if(event instanceof NavigationStart){
          if(event['url']=='/login'){
            this.showHead = false;
          } else {
            this.showHead = true;
          }
        }
      });
  }

}

