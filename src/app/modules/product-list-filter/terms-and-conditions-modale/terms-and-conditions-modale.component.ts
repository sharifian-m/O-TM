import {Component, Inject, Injector, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions-modale',
  templateUrl: './terms-and-conditions-modale.component.html',
  styleUrls: ['./terms-and-conditions-modale.component.scss']
})
export class TermsAndConditionsModaleComponent implements OnInit {
  supplierItems: any;

  unitTitle: any;
  isShowLogin = false;
  currentUser:any;
  private nationalCode: string;
  constructor(
    @Inject(Injector) protected injector: Injector,
    private modal: NgbActiveModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router:Router,
  ) { }
  protected get http(): HttpClient {
    return this.injector.get(HttpClient);
  }
  ngOnInit(): void {
    this.getCurrentUser();
   this.http.get(`${environment.baseUrl}ShereCustom/GetUnitEnumForCombo`).subscribe((res: any) => {
      this.unitTitle = res.result.find(x => +x.value === this.supplierItems.itemDetails.unit).displayText;
    });



  }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  mandatoryNationalCode(){
    if (this.authService.isAuth){
    
      // this.authService.customerId = this.currentUser.id;
      // this.authService.customerType = this.currentUser.customerType;
      // this.authService.getProfile(this.currentUser.mobileNumber).subscribe(
      //   (res: any) => {

          this.nationalCode = this.currentUser.nationalCode;
          if (this.currentUser.nationalCode == null || this.currentUser.nationalCode === '' || this.currentUser.nationalCode === 'null') {

            this.router.navigate(['/user-panel/edit-profile']);
            this.modal.dismiss();
          } else if (this.currentUser.nationalCode === undefined) {
            this.router.navigate(['/user-panel/edit-profile']);
            this.modal.dismiss();
          } else {
            this.toastr.success('کد ملی شما موجود است');
          }
        // });

    }else {
      this.toastr.warning('لطفا وارد حساب کاربری خود شوید');
    }
  }
  // tslint:disable-next-line:typedef
  close() {
    // this.modal.close();
    this.modal.dismiss();
  }



}

