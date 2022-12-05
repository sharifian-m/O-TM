import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from './directives/number.directive';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapDialogComponent } from './components/map-dialog/map-dialog.component';
import { CountUpDownComponent } from './count-up-down/count-up-down.component';
import { BtnCartComponent } from './btn-cart/btn-cart.component';
import { ConfirmComponent } from './confirm/confirm.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReasonForCancelingComponent } from './reason-for-canceling/reason-for-canceling.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import {QRCodeModule} from 'angular2-qrcode';
import { RoundUpPipe } from './pipes/round-up.pipe';
import { GetNumberWithCommaPipe } from './pipes/get-number-with-comma.pipe';




@NgModule({
  declarations: [NumberDirective, MapDialogComponent, CountUpDownComponent,BtnCartComponent, ConfirmComponent, ReasonForCancelingComponent, UploadDocumentsComponent, RoundUpPipe, GetNumberWithCommaPipe],
    imports: [
        CommonModule,
        LeafletModule,
        FormsModule,
        ReactiveFormsModule,
        QRCodeModule
    ],
  exports:[
    NumberDirective,
    MapDialogComponent,
    CountUpDownComponent,
    BtnCartComponent,
  
RoundUpPipe,GetNumberWithCommaPipe  ]
})
export class SharedModule { }
