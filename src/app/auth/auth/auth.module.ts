import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CountdownModule } from 'ngx-countdown';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [AuthComponent, CustomerRegisterComponent ],
  imports: [
    SharedModule,
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CountdownModule,
    NgxCaptchaModule,
    NgbModule,
    NgSelectModule,
    MainLayoutModule

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AuthModule { }
