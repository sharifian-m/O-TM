import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import {MainLayoutModule} from '../../layout/main/main-layout.module';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [RecruitmentComponent],
    imports: [
        CommonModule,
        RecruitmentRoutingModule,
        MainLayoutModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        NgxSpinnerModule,
        SharedModule,
    ]
})
export class RecruitmentModule { }
