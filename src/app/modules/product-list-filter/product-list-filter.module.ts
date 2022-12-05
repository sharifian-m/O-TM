import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductListFilterRoutingModule} from './product-list-filter-routing.module';
import {ProductListFilterComponent} from './product-list-filter/product-list-filter.component';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProductDetailComponent} from './product-detail/product-detail.component'; // <-- import the module
import {MainLayoutModule} from 'src/app/layout/main/main-layout.module';
import {NgxUsefulSwiperModule} from 'ngx-useful-swiper';
import {SharedModule} from 'src/app/shared/shared.module';
import {NgxStarRatingModule} from 'ngx-star-rating';
import {NgxImageZoomModule} from 'ngx-image-zoom';
import {LoginRegisterModalComponent} from './login-register-modal/login-register-modal.component';
import {NgxCaptchaModule} from 'ngx-captcha';
import {CountdownModule} from 'ngx-countdown';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {TermsAndConditionsModaleComponent} from './terms-and-conditions-modale/terms-and-conditions-modale.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {SlideToggleModule} from 'ngx-slide-toggle';
import { SimilarProductComponent } from './similar-product/similar-product.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [ProductListFilterComponent, ProductDetailComponent, LoginRegisterModalComponent, TermsAndConditionsModaleComponent, SimilarProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    ProductListFilterRoutingModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    MainLayoutModule,
    SharedModule,
    NgbModule,
    NgxUsefulSwiperModule,
    NgxStarRatingModule,
    NgxCaptchaModule,
    CountdownModule,
    NgxImageZoomModule,
    PerfectScrollbarModule,
    SlideToggleModule

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
  exports: [
    LoginRegisterModalComponent
  ]
})
export class ProductListFilterModule {
}
