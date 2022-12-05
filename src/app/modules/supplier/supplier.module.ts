import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import {MainLayoutModule} from '../../layout/main/main-layout.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [SupplierListComponent, SupplierDetailComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    MainLayoutModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class SupplierModule { }
