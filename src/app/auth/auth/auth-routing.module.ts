import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {CustomerRegisterComponent} from './customer-register/customer-register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent, data: {
      breadcrumb: {
        label: 'ثبت نام / ورود',

      }
    },
  },
  {
    path: 'login-admin/:phone/:user/:pass',
    component: AuthComponent, data: {
      breadcrumb: {
        label: 'ثبت نام / ورود',

      }
    },
  },
  {
    path: 'customer-register',
    component: CustomerRegisterComponent,
    data: {
      breadcrumb: {
        label: 'تکمیل ثبت نام',

      }
    },
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
