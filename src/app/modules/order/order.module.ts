import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    NgbModule,
    MainLayoutModule,
    NgxSpinnerModule,
    OrderRoutingModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class OrderModule { }
