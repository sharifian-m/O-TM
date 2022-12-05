import { Injectable, Injector } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService extends HttpService {

  constructor( injector:Injector) { 
    super(injector,'CustomerAddressCrud')
  }
  
}
