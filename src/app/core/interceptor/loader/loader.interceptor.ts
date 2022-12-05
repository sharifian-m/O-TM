import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LoaderService} from '../../services/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url && req.url !== 'https://api.otamin.ir/api/services/app/customer/GetProfile') {
      this.loaderService.show();
      return next.handle(req).pipe(
        finalize(() => {

          this.loaderService.hide();
        })
      );
    }
    return next.handle(req);
  }
}
