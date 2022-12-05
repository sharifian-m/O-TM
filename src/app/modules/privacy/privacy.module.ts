import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyComponent } from './privacy/privacy.component';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    MainLayoutModule,
    PrivacyRoutingModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class PrivacyModule { }
