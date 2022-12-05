import { Injectable, Injector } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ShereCustomService extends HttpService {
  nextStepDisabled = false;
  storeId: number;
  marketerUniqIdentifier: number;
  constructor( injector: Injector) {
    super(injector, 'ShereCustom');
  }

}
