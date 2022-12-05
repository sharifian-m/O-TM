import {Injectable, Injector} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactorCrudService extends HttpService {
  public controller: string;

  constructor(injector: Injector) {
    super(injector, 'FactorCrud');
  }
}
