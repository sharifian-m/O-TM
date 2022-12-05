import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FactorCrudService} from 'src/app/core/services/factor/factor.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {ShereCustomService} from '../../../core/services/share-custom/share-custom.service';
import {CartCrudervice} from '../../../core/services/cart/cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {PaymentTypeComponent} from '../payment-type/payment-type.component';
import {ConfirmComponent} from 'src/app/shared/confirm/confirm.component';
import {ReasonForCancelingComponent} from '../../../shared/reason-for-canceling/reason-for-canceling.component';
import {PriceChangedComponent} from '../price-changed/price-changed.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-factor-list',
  templateUrl: './factor-list.component.html',
  styleUrls: ['./factor-list.component.scss']
})
export class FactorListComponent implements OnInit {
  factors: any[] = [];
  q = 1;
  totalCount: number;
  item: any;
  private factorState: any[];
  currentUser:any;
  constructor(private factorCrudService: FactorCrudService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private shereCustomService: ShereCustomService,
              public cartCrudService: CartCrudervice,
              private modalService: NgbModal,
              private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.spinner.show();
    this.shereCustomService.get('GetFactorStateEnumForCombo').subscribe((res: any) => {
        this.factorState = res.result;
        console.log('res',res);
        
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
    this.getAllFactor();
    window.scrollTo(0, 0);
  }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  getAllFactor() {

    const skipCount = 10 * (this.q - 1);


    const data = {
      customerId: this.currentUser.id,
      factorState: 0,
      maxResultCount: 10,
      skipCount,


    };

    this.spinner.show();
    this.factorCrudService.post('FetchFactorWithItemPaging2', data).subscribe(
      (res: any) => {
        this.factors = res.result.items;
        this.totalCount = res.result.totalCount;
        console.log('this.factors',  this.factors);
        console.log('this.totalCount', this.totalCount);
        this.spinner.hide();
      }, () => {
        this.toastr.error('خطا در دریافت فاکتور های پرداخت نشده');
        this.spinner.hide();
      }
    );
  }

  findTitel(value) {
    return this.factorState?.find(x => +x.value === value).displayText;
  }

  factorDetail(factorId, factorNumber) {
    this.router.navigate(['/factor/factor-detail'], {queryParams: {factorId, factorNumber}});
  }

  cancelFactor(item) {
   
    const ref = this.modalService.open(ReasonForCancelingComponent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
    ref.result.then((result) => {

    }, (reason) => {

    });
    ref.componentInstance.description.subscribe((cancelDescription) => {
      if (cancelDescription) {
        const data = {
          factorId: item.id,
          description: cancelDescription.toString()
        };
        this.spinner.show();
        this.factorCrudService.post('CancelFactor', data).subscribe(
          (res: any) => {
            console.log('factorCrudService',res);
            
            if (res.result.isSuccessful) {
              this.getAllFactor();
              this.toastr.success('آیتم انتخابی با موفقیت لغو شد');
              this.spinner.hide();
            } else {
              this.toastr.error('خطا در ارسال اطلاعات');
              this.spinner.hide();
            }
          }, () => {
            this.spinner.hide();
          }
        );
      }
    });
  }

  pay(item) {

    const ref = this.modalService.open(PaymentTypeComponent, {ariaLabelledBy: 'modal-basic-title', size: 'md'});
    ref.result.then((result) => {

    }, (reason) => {

    });
    ref.componentInstance.item = item;

    ref.componentInstance.statusEmit.subscribe(($e) => {
      if ($e) {
        this.getAllFactor();

      }

    });


  }

  pageChanged(event) {
    this.q = event;
    this.getAllFactor();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
