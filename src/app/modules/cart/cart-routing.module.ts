import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartComponent} from './cart/cart.component';
import {CompanyCartComponent} from './company-cart/company-cart.component';
import {PayFactorComponent} from './pay-factor/pay-factor.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  },
  {
    path: 'cart-item/',
    component: CartComponent,

  }, {
    path: 'PayFactorComponent',
    component: PayFactorComponent,

  },

  {
    path: 'cart-item/:id/:count',
    component: CartComponent,
    data: {
      breadcrumb: {
        label: '',

      },
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {
}
