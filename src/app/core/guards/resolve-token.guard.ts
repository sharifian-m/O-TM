import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
// import {TokenAuth} from '../services/tokenAuth/TokenAuth';
import {AuthService} from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveTokenGuard implements Resolve<any> {
  count = 0;

  constructor(
    private authService: AuthService,
    // private tokenAuth: TokenAuth
    ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {



    return 'reza';
  }

  // getTokenAuth() {

  //   this.tokenAuth.TokenAuth().subscribe((response: any) => {
  //     window.localStorage.setItem('token', JSON.stringify(response.result.accessToken));
  //     this.authService.isAuth = true;
  //     this.authService.index = this.authService.index++;
  

  //   });


  // }


}
