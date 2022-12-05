import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadAppRoutingModule } from './download-app-routing.module';
import { DownloadAppComponent } from './download-app/download-app.component';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';
import {NgxUsefulSwiperModule} from 'ngx-useful-swiper';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [DownloadAppComponent],
  imports: [
    CommonModule,
    MainLayoutModule,
    NgxUsefulSwiperModule,
    DownloadAppRoutingModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class DownloadAppModule { }
