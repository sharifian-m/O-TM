import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
// import { CartCrudervice } from '../cart/cart.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  index = 0;

  isLoginPage = false;
  changeDefaultStore = false;
  preRegisterData = new ReplaySubject();
  isAuth = false;
  fullName: string;
  mobileNumber: string;
  storeId: any = null;
  customerId: any = null;
  customerType: any = null;
  addressId: any = null;
  $currentTokenSubject: BehaviorSubject<any>;
  $currentToken: Observable<any>;

  $currentUserSubject: BehaviorSubject<any>;
  $currentUser: Observable<any>;

  $StoreDefaultIdSubject: BehaviorSubject<any>;
  $currentStoreDefaultId: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
   
  ) {
    this.$currentTokenSubject = new BehaviorSubject<any>(JSON?.parse(<any>localStorage.getItem('tokenInfo')));
    this.$currentToken = this.$currentTokenSubject.asObservable();

    this.$currentUserSubject = new BehaviorSubject<any>(JSON?.parse(<any>localStorage.getItem('currentUser')));
    this.$currentUser = this.$currentUserSubject.asObservable();

    this.$StoreDefaultIdSubject = new BehaviorSubject<any>(JSON?.parse(<any>localStorage.getItem('storeIdDefault')));
    this.$currentStoreDefaultId = this.$StoreDefaultIdSubject.asObservable();
  }

    storeDefaultId(defaultStoreId){
    localStorage.setItem('storeIdDefault', JSON.stringify(defaultStoreId));
    this.$StoreDefaultIdSubject.next(defaultStoreId);

    
  }

  storeTokenInfo(tokenInfo) {
    localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
    this.$currentTokenSubject.next(tokenInfo);
  }
  
  storeUserInfo(userInfo) {
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    this.$currentUserSubject.next(userInfo);
  }
  
  generateRefreshToken() {
    let tokenInfo:any;
    this.$currentToken.subscribe(res=>{
       tokenInfo =res;
    });

    return this.http
      .post<any>(`${environment.baseUrlAuth}RefreshToken`, {
        accessToken: tokenInfo.accessToken,
        refreshToken: tokenInfo.refreshToken,
      })
      .pipe(
        map((response: any) => {
          console.log(response);
          
          this.storeTokenInfo(response.result);
          console.log(response);
          
          return response.result;
        })
      );
  }

  logout() {
    window.localStorage.removeItem('currentUser');
    window.localStorage.removeItem('tokenInfo');
    window.localStorage.removeItem('storeIdDefault');
    this.isAuth = false;
    window.localStorage.removeItem('roleCode');
    window.localStorage.removeItem('basket');
    window.localStorage.removeItem('basketCount');
    window.localStorage.removeItem('megaMenu');
   
  }


  getUser() {
    return this.http.post(`${environment.baseUrlAuth}GetUser`, {});
  }

  preRegister(model: any) {
    return this.http.post(`${environment.baseUrl}Customer/preRegister`, model);
  }

  preLogin(model: any) {
    return this.http.post(`${environment.baseUrl}Customer/preLogin`, model);
  }

  validateSmsCodeRegister(model: any) {
    return this.http.post(
      `${environment.baseUrl}Customer/ValidateSmsCodePreRegister`,
      model
    );
  }

  validateSmsCodePreLogin(model: any) {
    return this.http.post(
      `${environment.baseUrl}Customer/ValidateSmsCodePreLogin`,
      model
    );
  }

  registerAfterValidate(model: any) {
    return this.http.post(
      `${environment.baseUrl}Customer/RegisterAfterValidateV2`,
      model
    );
  }

  registerrAfterValidateWithFactory(model: any) {
    return this.http.post(
      `${environment.baseUrl}Customer/RegisterAfterValidateWithFactory`,
      model
    );
  }
  getProfile(mobileNumber) {
    let params = new HttpParams();
    params = params.set('mobileNumber', mobileNumber);
    return this.http.get(`${environment.baseUrl}customer/GetProfile`, {
      params,
    });
  }


  getCustomerProfileWithToken(mobileNumber) {
 
    let params = new HttpParams();
    params = params.set('mobileNumber', mobileNumber);
    return this.http.get(`${environment.baseUrl}customer/GetProfile`, {
      params,
    });
  }
  editProfile(model: any) {
    return this.http.post(`${environment.baseUrl}Customer/EditProfile`, model);
  }
}
