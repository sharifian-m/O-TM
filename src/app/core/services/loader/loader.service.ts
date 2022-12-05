import { Injectable, Injector } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService  {
   isLoading:boolean = true;
    constructor(public spinner:NgxSpinnerService) {

      }
    show() {
        this.spinner.show();
        this.isLoading=true
    }
    hide() {
        this.spinner.hide();
        this.isLoading=false;


    }


}
