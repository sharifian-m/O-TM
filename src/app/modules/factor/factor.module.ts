import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactorRoutingModule } from './factor-routing.module';
import { FactorComponent } from './factor/factor.component';
import { FormsModule } from '@angular/forms';
import { FactorDetailComponent } from './factor-detail/factor-detail.component';
import { FactorListComponent } from './factor-list/factor-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerModule} from 'ngx-spinner';
import { PriceChangedComponent } from './price-changed/price-changed.component';
import {CartModule} from '../cart/cart.module';


@NgModule({
  declarations: [FactorComponent, FactorDetailComponent, FactorListComponent, PaymentTypeComponent, PriceChangedComponent],
    imports: [
        CommonModule,
        FactorRoutingModule,
        FormsModule,
        NgbModule,
        MainLayoutModule,
        NgxPaginationModule,
        NgxSpinnerModule,
        CartModule
    ]
})
export class FactorModule { }
