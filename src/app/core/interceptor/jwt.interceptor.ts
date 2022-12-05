import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  tokeninfo:any;
  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    
    this.authService.$currentTokenSubject.subscribe(res=>{
       this.tokeninfo=res
    });


    // if token exist then user logged in

    if (this.tokeninfo) {
      return next.handle(this.addToken(request, this.tokeninfo.accessToken)).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            console.log('err',err);
            
            if (err.status ===401) {
           
              this.authService.generateRefreshToken().subscribe((newToken) => {
                if (newToken) {
                  console.log(newToken);
                  
                  return next
                    .handle(this.addToken(request, newToken.accessToken))
                    .pipe(
                      catchError((err) => {
                        if (err instanceof HttpErrorResponse) {
                          if (err.status  ===401) {
                            this.authService.logout();
                            this.router.navigate(['/auth']);
                          }
                          return throwError(err);
                        }
                      })
                    );
                }
              });
            }
          }
          return throwError(err);
        })
      );
    } else if (!this.tokeninfo) {
      return next.handle(request).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/']);
            }
          }
          return throwError(err);
        })
      );
    }
  }
}
