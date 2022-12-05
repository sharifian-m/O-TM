import {Injectable, Injector} from '@angular/core';
import {HttpService} from '../http.service';
import {environment} from '../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenAuth extends HttpService {
  
}
