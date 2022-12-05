import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MainLayoutRoutingModule} from './main-layout.routing.module';



@NgModule({
  declarations: [NavComponent, HeaderComponent, FooterComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    MainLayoutRoutingModule,
    NgxSpinnerModule
  ],
  exports: [ NavComponent, HeaderComponent, FooterComponent, MainLayoutComponent]
})
export class MainLayoutModule { }
