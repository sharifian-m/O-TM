import {Injectable, Injector} from '@angular/core';
import {HttpService} from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerBrandsService extends HttpService{

  constructor(injector: Injector) {
    super(injector, 'CustomerBrandsCrud');
  }
}
