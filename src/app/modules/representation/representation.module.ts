import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SharedModule} from '../../shared/shared.module';
import { RepresentationRoutingModule } from './representation-routing.module';
import { RepresentationComponent } from './representation/representation.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MainLayoutModule} from '../../layout/main/main-layout.module';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [
    RepresentationComponent
  ],
  imports: [
    CommonModule,
    RepresentationRoutingModule,
    MainLayoutModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    NgxSpinnerModule,
    SharedModule
  ],
   exports: [
    RepresentationComponent
  ]
})
export class RepresentationModule { }
