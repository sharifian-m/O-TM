import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadAppRoutingModule } from './meta-routing.module';
import { MetaComponent } from './meta/meta.component';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';
import {NgxUsefulSwiperModule} from 'ngx-useful-swiper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [MetaComponent],
  imports: [
    CommonModule,
    MainLayoutModule,
    NgxUsefulSwiperModule,
    DownloadAppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class MetaModule { }
