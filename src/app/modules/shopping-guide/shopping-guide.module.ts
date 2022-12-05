import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingGuideRoutingModule } from './shopping-guide-routing.module';
import { ShoppingGuideComponent } from './shopping-guide/shopping-guide.component';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [ShoppingGuideComponent],
  imports: [
    CommonModule,
    MainLayoutModule,
    ShoppingGuideRoutingModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class ShoppingGuideModule { }
