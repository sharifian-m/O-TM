import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { CountdownModule } from 'ngx-countdown';
@NgModule({
  declarations: [HomeComponent, ItemsComponent],
  imports: [
    CountdownModule,
    NgbModule,
    CommonModule,
    NgxUsefulSwiperModule,
    SharedModule,
    MainLayoutModule,
    HomeRoutingModule,
  ],
  exports:[HomeComponent,NgbModule,ItemsComponent],
 providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class HomeModule { }
