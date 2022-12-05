import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { MainLayoutModule } from 'src/app/layout/main/main-layout.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FactorUnpaidComponent } from './factor-unpaid/factor-unpaid.component';
import { OrderListComponent } from './order-list/order-list.component';

import { QRCodeModule } from 'angular2-qrcode';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailComponent } from './order-list/order-detail/order-detail.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { AddStoreComponent } from './my-store/add-store/add-store.component';
import { StoreInformationComponent } from './my-store/store-information/store-information.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { AddAddressComponent } from './my-address/add-address/add-address.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FactorDetailComponent } from './factor-unpaid/factor-detail/factor-detail.component';
@NgModule({
  declarations: [DashboardComponent,
    UserPanelComponent,
    EditProfileComponent,
    FactorUnpaidComponent,
    OrderListComponent,
    OrderDetailComponent,
    MyStoreComponent,
     AddStoreComponent,
     StoreInformationComponent,
     MyAddressComponent,
     AddAddressComponent,
     FactorDetailComponent],
    imports: [
        CommonModule,
        MainLayoutModule,
        SharedModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        QRCodeModule,
        NgbModule,
        UserPanelRoutingModule,
        NgxPaginationModule
    ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class UserPanelModule { }
