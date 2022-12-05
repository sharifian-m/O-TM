import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from './cart/cart.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {CountdownModule} from 'ngx-countdown';
import {NgxCaptchaModule} from 'ngx-captcha';
import {MainLayoutModule} from 'src/app/layout/main/main-layout.module';
import {CompanyCartComponent} from './company-cart/company-cart.component';
import {CartListWithCompanyComponent} from './cart-list-with-company/cart-list-with-company.component';
import {AcceptCartListWithCompanyComponent} from './accept-cart-list-with-company/accept-cart-list-with-company.component';
import {AddFactorComponent} from './add-factor/add-factor.component';
import {SelectCompanyStoreComponent} from './select-company-store/select-company-store.component';
import {PayFactorComponent} from './pay-factor/pay-factor.component';

import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ItemRequiredRoleCodeDialogComponent} from './item-required-role-code-dialog/item-required-role-code-dialog.component';
import {ProductListFilterModule} from '../product-list-filter/product-list-filter.module';
import {NgbActiveModal, NgbModalRef, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CartComponent, CompanyCartComponent, CartListWithCompanyComponent, AcceptCartListWithCompanyComponent, AddFactorComponent, SelectCompanyStoreComponent, PayFactorComponent, ItemRequiredRoleCodeDialogComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CountdownModule,
    NgxCaptchaModule,
    MainLayoutModule,
    ProductListFilterModule,
    NgbModule,

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NgbActiveModal],
  exports: [
    PayFactorComponent
  ]
})
export class CartModule {
}
