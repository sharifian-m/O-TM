import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrandListComponent } from './brand-list/brand-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [BrandDetailComponent, BrandListComponent],
    imports: [
        CommonModule,
        MainLayoutModule,
        NgxUsefulSwiperModule,
        NgxSpinnerModule,
        SharedModule,
        BrandRoutingModule,
        NgxPaginationModule,
        ReactiveFormsModule
    ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class BrandModule { }
