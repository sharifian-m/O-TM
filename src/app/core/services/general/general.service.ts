import { Injectable, Injector } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService extends HttpService {
  isLoadData:boolean=true;
  constructor( injector:Injector) { 
    super(injector,'HomePage')
  }
  
}
