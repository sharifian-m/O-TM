import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from '../../services/auth/auth.service';

import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class LocationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
         
              private router: Router
  ) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect user to the logout page
            this.router.navigate(['/']);
          }

        }
        return throwError(err);
      })
    );
  }
}
