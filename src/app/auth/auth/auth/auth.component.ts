import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ReCaptcha2Component} from 'ngx-captcha';
import {CountdownComponent, CountdownConfig} from 'ngx-countdown';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/core/services/auth/auth.service';
// import {TokenAuth} from '../../../core/services/tokenAuth/TokenAuth';

import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { CartCrudervice } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @ViewChild('cd', {static: false}) private countdown: CountdownComponent;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  isSendSms = false;
  isDisabledCode = true;
  form: UntypedFormGroup;
  isSuccessCapcha = false;
  resetTimer = false;
  isUserExist = false;
  isFormValid = false;
  isShowCapcha = false;
  phone: any;
  loginOutPutDTO:any;
  userInfo:any;
  buyBasket:any;
profileByToken:any;
  constructor(private fb: UntypedFormBuilder,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private route: ActivatedRoute,
              private cartCrudService: CartCrudervice,
              private http: HttpClient,
              private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.authService.isLoginPage = true;
    window.scrollTo(0, 0);
    if (this.router.url.search('login-admin') !== -1) {
      this.route.params.subscribe(
        (data) => {
          this.phone = data.phone;

          if (this.phone) {
            this.hiddenLogin(this.phone, data.user, data.pass);
          }
        }
      );
    }
    this.initForm();
    this.codeChange();
    // this.tokenService.getAuthToken();
  }

  initForm() {
    this.form = this.fb.group({
      mobileNumber: [null, [Validators.required, Validators.minLength(11)]],
      code: [null, [Validators.required, Validators.minLength(4)]],
    });
    setTimeout(() => {
      this.form.controls.code.setErrors(null);

    }, 1000);
  }

  async hiddenLogin(mobileNumber, user, pass) {
    window.localStorage.removeItem('currentUser');
    window.localStorage.removeItem('basket');
    window.localStorage.removeItem('basketCount');
    window.localStorage.removeItem('addressId');
    window.localStorage.removeItem('storeIdDefault');
    window.localStorage.removeItem('megaMenu');
    window.localStorage.removeItem('roleCode');
    this.spinner.show();
    const data = {
      userNameOrEmailAddress: user,
      password: pass,
      rememberClient: true
    };
    await this.http.post(`${environment.baseUrlAuth}`, data).subscribe((resp: any) => {
        const token = resp.result.accessToken;
        localStorage.setItem('token', resp.result.accessToken);
        this.authService.getCustomerProfileWithToken(mobileNumber)
          .subscribe((res: any) => {
              if (res.result.isSuccessful) {
                this.spinner.hide();
                const data1 = {
                  mobileNumber: res.result.model.mobileNumber,
                  uniqIdentifier: res.result.model.uniqIndentifier,
                  customerType: res.result.model.cusromerTypes,
                  firstName: res.result.model.firstName,
                  lastName: res.result.model.lastName,
                  customerId: res.result.model.id,
                  nationalCode: res.result.model.nationalCode

                };
                // this._userInfoService.setUserInfo(userInfo);
               this.authService.storeUserInfo(data1)
                if (res.result.model.storeOutputDtos) {
                  res.result.model.storeOutputDtos.map(
                    (item) => {
                      this.authService.storeId = item.id;
                      // window.localStorage.setItem('storeId', item.id);
                    
                        if (item.isDefault) {
                          this.authService.storeDefaultId( item.id)
  
  
                        }

                      

                    }
                  );
                }

                this.router.navigate(['/home']);
                window.scrollTo(0, 0);
                setTimeout(() => {
                  window.location.reload();
                }, 10);

              } else {
                this.spinner.hide();
                this.toastr.error(res.result.reponseDescription);
              }
            }, (error) => {
              this.spinner.hide();
              this.toastr.error(error.error.error.message, 'Error');
            }
          );
      }, (error) => {
        this.spinner.hide();
        this.toastr.error('خطا در ورود', 'Error');
      }
    );
  }

  preRegister() {
    this.spinner.show();
    let phoneNumber = this.form.controls.mobileNumber.value;
    phoneNumber = phoneNumber.replace('0', '98');
    const data = {
      mobileNumber: phoneNumber
    };
   
    
    this.authService.preRegister(data).subscribe(
      (res: any) => {
        if (res.result.isSuccessful) {
          this.isUserExist = res.result.isSuccessful;
          this.isSendSms = res.result.isSuccessful;
          this.spinner.hide();
          this.countdown?.begin();

        } else {
          this.spinner.hide();
          // this.toastr.warning('کاربر قبلا ثبت نام شده است')
          this.preLogin();
          this.countdown?.begin();
        }

      }
    );
  }

  validateSmsCode() {
    if (this.isUserExist) {
      this.validateSmsCodeRegister();
    } else {
      this.validateSmsCodeLogin();
    }

  }

  validateSmsCodeRegister() {
    this.spinner.show();
    let phoneNumber = this.form.controls.mobileNumber.value;
    phoneNumber = phoneNumber.replace('0', '98');
    const data = {
      mobileNumber: phoneNumber,
      code: this.form.controls.code.value,
    };
    this.authService.validateSmsCodeRegister(data).subscribe(
      (res: any) => {
        if (res.result.isSuccessful) {
          this.spinner.hide();
          this.authService.preRegisterData.next({
            mobileNumber: this.form.controls.mobileNumber.value,
            verificationCode: this.form.controls.code.value
          });
          this.router.navigate(['/auth/customer-register']);
        } else {
          this.spinner.hide();
          this.isShowCapcha = true;
          setTimeout(() => {
            this.form.setErrors({incorrect: true});

          }, 10);
          if (this.captchaElem) {
            this.captchaElem.reloadCaptcha();
            setTimeout(() => {
              this.form.setErrors({incorrect: true});
              this.form.controls.code.reset();
              this.isSuccessCapcha = false;

            }, 10);
          }

          this.toastr.error('کد وارد شده نادرست است');
        }

      }
    );
  }

  preLogin() {
  
    this.spinner.show();
    let phoneNumber = this.form.controls.mobileNumber.value;
    phoneNumber = phoneNumber.replace('0', '98');
    const data = {
      mobileNumber: phoneNumber
    };
    this.authService.preLogin(data).subscribe(
      (res: any) => {
        if (res.result.isSuccessful) {
          this.isSendSms = res.result.isSuccessful;
          this.spinner.hide();

        } else if (res.result.reponseDescription === 'Wait') {
          this.toastr.error(' شما به تازگی وارد سامانه شده اید. لطفا کمی صبر کنید سپس مجددا امتحان کنید');
          this.spinner.hide();
        } else {
          this.spinner.hide();
          // this.toastr.warning('کاربر قبلا ثبت نام شده است')
        }

      }
    );
  }

  validateSmsCodeLogin() {
    this.spinner.show();
    let phoneNumber = this.form.controls.mobileNumber.value;
    phoneNumber = phoneNumber.replace('0', '98');
    const data = {
      mobileNumber: phoneNumber,
      code: this.form.controls.code.value,
    };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    this.authService.validateSmsCodePreLogin(data).subscribe(
      (res: any) => {
           
        if (res.result.isSuccessful) {
          this.loginOutPutDTO=res.result.model.loginOutputDto;
          this.spinner.hide();
          const token=res.result.model.token;
          this.authService.storeTokenInfo(token);
          this.authService.getUser().subscribe((res:any)=>{
            if (res.success) {
              this.userInfo=res.result;
              if(this.userInfo.userName===this.loginOutPutDTO.mobileNumber&& (this.loginOutPutDTO.cusromerTypes ===1 || this.loginOutPutDTO.cusromerTypes ===2)) {
                
              this.authService.storeUserInfo(this.loginOutPutDTO);
              localStorage.setItem('roleCode', this.loginOutPutDTO.roleCode);
              this.getBuyBasket();
                this.toastr.success('با موفقیت وارد شدید');
              
                this.authService.isAuth = true;
                this.router.navigate(['/home']);

               if( this.loginOutPutDTO.storeOutputDtos){
                this.loginOutPutDTO.storeOutputDtos.map(
                  (item) => {
                                   
                      if (item.isDefault) {
                        this.authService.storeDefaultId( item.id)
                        }
                   }
                );
               }
               else{
                
                this.toastr.warning('جهت ادامه بازدید از سایت لازم است ابتدا از قسمت پروفایل فروشگاه خود را ثبت نمایید');
               }
            }
            else {
              this.loginToCPanel(this.profileByToken.mobileNumber);
              // window.location.href = 'https://cpanel.otamin.ir/#/';
            }
            }
          })
        }


  })
}
      
getBuyBasket(){

  this.cartCrudService.GetCartBySupplier().subscribe((res:any)=>{
  this.buyBasket=res.result.model;
  this.cartCrudService.storeBasketBySupplier(this.buyBasket);

})

  }
  loginToCPanel(mobileNumber) {
    if (mobileNumber) {
      // const a = document.createElement('a');
      // a.target = '_blank';
      // a.href = `https://cpanel.otamin.ir/#/auth/login-admin/${mobileNumber}/sdk2re342za34/editableAdminLoginCpanel`;
      // a.click();
      window.location.href = `https://cpanel.otamin.ir/#/`;
    }
  }

  codeChange() {
    this.form.controls.code.valueChanges.subscribe(
      (value) => {
        if (!this.isSuccessCapcha && this.isShowCapcha) {
          setTimeout(() => {
            this.form.setErrors({incorrect: true});

          }, 10);
        } else {
          setTimeout(() => {
            this.form.setErrors(null);

          }, 10);
        }
      }
    );
  }

  countDownHandler(event) {
    if (event.action === 'done') {
      this.resetTimer = !this.resetTimer;
    } else {
      this.resetTimer = false;
    }
  }

  reSendCode() {
    this.countdown.restart();
    this.preRegister();
  }

  changePhone() {
    this.isSendSms = false;
    setTimeout(() => {
      this.form.controls.code.setErrors(null);

    }, 500);


  }

  handleSuccess(event) {
    this.isSuccessCapcha = true;
    if (this.isSuccessCapcha) {
      setTimeout(() => {
        this.form.setErrors(null);
      }, 10);
    } else {
      setTimeout(() => {
        this.form.setErrors({incorrect: true});

      }, 10);
    }
  }

  handleLoad() {

  }

  handleReset() {

  }

  handleExpire() {

  }
}
