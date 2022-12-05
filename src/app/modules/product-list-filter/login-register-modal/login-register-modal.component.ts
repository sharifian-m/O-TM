import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptcha2Component } from 'ngx-captcha';
import { CountdownComponent } from 'ngx-countdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login-register-modal',
  templateUrl: './login-register-modal.component.html',
  styleUrls: ['./login-register-modal.component.scss']
})
export class LoginRegisterModalComponent implements OnInit {
  @Input() isShowLogin = true;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  isSendSms = false;
  isDisabledCode = true;
  form: UntypedFormGroup;
  isSuccessCapcha = false;
  resetTimer = false;
  isUserExist = false;
  isFormValid = false;
  isShowCapcha = false;
  constructor(private fb: UntypedFormBuilder,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.authService.isLoginPage = true;
    window.scrollTo(0, 0);
    this.initForm();
    this.codeChange();
  }
initForm(){
  this.form = this.fb.group({
    mobileNumber : [null, [Validators.required, Validators.minLength(11)]],
    code: [null, [Validators.required, Validators.minLength(4)]],
  });
  setTimeout(() => {
this.form.controls.code.setErrors(null);

  }, 1000);
}
preRegister(){
  this.spinner.show();
  let phoneNumber = this.form.controls.mobileNumber.value;
  phoneNumber = phoneNumber.replace('0', '98');
  const data = {
    mobileNumber: phoneNumber
  };
  this.authService.preRegister(data).subscribe(
    (res: any) => {
      if (res.result.isSuccessful){
        this.isUserExist = res.result.isSuccessful;
        this.isSendSms = res.result.isSuccessful;
        this.spinner.hide();
        this.countdown.begin();

      }else{
        this.spinner.hide();
        // this.toastr.warning('کاربر قبلا ثبت نام شده است')
        this.preLogin();
        this.countdown.begin();
      }

    }
  );
}
validateSmsCode(){
  if (this.isUserExist){
    this.validateSmsCodeRegister();
  }else{
    this.validateSmsCodeLogin();
  }

}
validateSmsCodeRegister(){
  this.spinner.show();
  let phoneNumber = this.form.controls.mobileNumber.value;
  phoneNumber = phoneNumber.replace('0', '98');
  const data = {
    mobileNumber: phoneNumber,
    code: this.form.controls.code.value,
  };
  this.authService.validateSmsCodeRegister(data).subscribe(
    (res: any) => {
      if (res.result.isSuccessful){
        this.spinner.hide();
        this.authService.preRegisterData.next({mobileNumber: this.form.controls.mobileNumber.value, verificationCode: this.form.controls.code.value});
        this.router.navigate(['/auth/customer-register']);
      }else{
        this.spinner.hide();
        this.isShowCapcha = true;
        setTimeout(() => {
          this.form.setErrors({incorrect: true});

          }, 10);
        if (this.captchaElem){
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

preLogin(){
  this.spinner.show();
  let phoneNumber = this.form.controls.mobileNumber.value;
  phoneNumber = phoneNumber.replace('0', '98');
  const data = {
    mobileNumber: phoneNumber
  };
  this.authService.preLogin(data).subscribe(
    (res: any) => {
      if (res.result.isSuccessful){
        this.isSendSms = res.result.isSuccessful;
        this.spinner.hide();


      }else{
        this.spinner.hide();
        // this.toastr.warning('کاربر قبلا ثبت نام شده است')
      }

    }
  );
}
validateSmsCodeLogin(){
  this.spinner.show();
  let phoneNumber = this.form.controls.mobileNumber.value;
  phoneNumber = phoneNumber.replace('0', '98');
  const data = {
    mobileNumber: phoneNumber,
    code: this.form.controls.code.value,
  };
  this.authService.validateSmsCodePreLogin(data).subscribe(
    (res: any) => {
      if (res.result.isSuccessful){
        this.spinner.hide();
        const data = {
          mobileNumber: res.result.model.loginOutputDto.mobileNumber,
          uniqIdentifier: res.result.model.loginOutputDto.uniqIndentifier,
          customerType: res.result.model.loginOutputDto.cusromerTypes,
          firstName: res.result.model.loginOutputDto.firstName,
          lastName: res.result.model.loginOutputDto.lastName,
          customerId: res.result.model.loginOutputDto.id

        };
       
        this.authService.storeUserInfo(data);
        // this.router.navigate(['/customer-register'])
        this.toastr.success('با موفقیت وارد شدید');
        this.authService.fullName = data.firstName + ' ' + data.lastName;
        this.authService.mobileNumber = data.mobileNumber;
        this.authService.isAuth = true;
        this.isShowLogin = false;

      }else{
        this.spinner.hide();

        this.isShowCapcha = true;
        setTimeout(() => {
          this.form.setErrors({incorrect: true});

          }, 10);
        if (this.captchaElem){
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

codeChange(){
  this.form.controls.code.valueChanges.subscribe(
    (value) => {
     if (!this.isSuccessCapcha && this.isShowCapcha){
       setTimeout(() => {
       this.form.setErrors({incorrect: true});

       }, 10);
     }else{
       setTimeout(() => {
      this.form.setErrors(null);

       }, 10);
     }
    }
  );
}
countDownHandler(event){
  if (event.action === 'done') {
      this.resetTimer = !this.resetTimer;
  }else{
    this.resetTimer = false;
  }
}
reSendCode(){
  this.countdown.restart();
  this.preRegister();
}
changePhone(){
  this.isSendSms = false;
  setTimeout(() => {
  this.form.controls.code.setErrors(null);

  }, 500);


}
handleSuccess(event){
this.isSuccessCapcha = true;
if (this.isSuccessCapcha){
setTimeout(() => {
  this.form.setErrors(null);
}, 10);
}else{
  setTimeout(() => {
    this.form.setErrors({incorrect: true});

  }, 10);
}
}
handleLoad(){

}
handleReset(){

}
handleExpire(){

}
}
