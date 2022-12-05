import { Injectable, Injector } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {environment} from '../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService extends HttpService {


  $homePageDataSubject: ReplaySubject<any> = new ReplaySubject<any>(1); 
  

  constructor( injector: Injector) {
    super(injector, 'HomePage');
  }

  getHomeItems(){
  
    return this.http.get(`${environment.baseUrl}${this.controller}/Get`);
  }

  setHomePageData(homeData){
    this.$homePageDataSubject.next(homeData);
  }

 
}
