import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CooperateWithUsRoutingModule } from './cooperate-with-us-routing.module';
import { CooperateWithUsComponent } from './cooperate-with-us/cooperate-with-us.component';
import {MainLayoutModule} from '../../layout/main/main-layout.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [CooperateWithUsComponent],
    imports: [
        CommonModule,
        CooperateWithUsRoutingModule,
        MainLayoutModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        SharedModule
    ]
})
export class CooperateWithUsModule { }
