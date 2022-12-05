import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './aboutus-routing.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [AboutusComponent],
  imports: [
    CommonModule,
    MainLayoutModule,
    AboutusRoutingModule
  ],
  exports:[AboutusComponent],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AboutusModule { }
