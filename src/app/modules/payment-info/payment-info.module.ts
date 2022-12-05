import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentInfoRoutingModule } from './payment-info-routing.module';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [PaymentInfoComponent],
  imports: [
    CommonModule,
    MainLayoutModule,
    PaymentInfoRoutingModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class PaymentInfoModule { }
