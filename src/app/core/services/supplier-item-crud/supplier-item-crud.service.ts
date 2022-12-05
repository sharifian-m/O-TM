import {Injectable, Injector} from '@angular/core';
import {HttpService} from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierItemCrudService extends HttpService{

  constructor(injector: Injector) {
    super(injector, 'SupplierItemCrudService');
  }
}
