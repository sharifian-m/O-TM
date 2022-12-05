import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq/faq.component';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    MainLayoutModule,
    FaqRoutingModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],

})
export class FaqModule { }
