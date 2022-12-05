import {Injectable, Injector} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpService} from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class OfferFactorService extends HttpService{
  public controller: string;

  constructor(injector: Injector) {
    super(injector, 'OfferFactor');
  }

  applyOfferToFactor(model: any) {
    return this.http.post(`${environment.baseUrl}OfferFactor/CreateOfferFactor`, model);
  }

  deleteOfferFactor(methodName, id: string) {
    return this.http.delete(`${environment.baseUrl}${this.controller}/${methodName}?Id=${id}`);
  }
}
