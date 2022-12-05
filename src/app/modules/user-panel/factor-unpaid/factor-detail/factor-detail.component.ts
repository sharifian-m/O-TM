import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FactorItemService} from 'src/app/core/services/factor-item/factor.service';
import {FactorCrudService} from 'src/app/core/services/factor/factor.service';

import {NgxSpinnerService} from 'ngx-spinner';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {ShereCustomService} from 'src/app/core/services/share-custom/share-custom.service';
import {ConfirmComponent} from '../../../../shared/confirm/confirm.component';
import {ReasonForCancelingComponent} from '../../../../shared/reason-for-canceling/reason-for-canceling.component';
import {PaymentTypeComponent} from '../../../factor/payment-type/payment-type.component';
import {HttpParams} from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-factor-detail',
  templateUrl: './factor-detail.component.html',
  styleUrls: ['./factor-detail.component.scss']
})
export class FactorDetailComponent implements OnInit {
  factorId: any;

  factorNumber;
  factorItems: any[] = [];
  order = false;
  payType: any;
  factorState: any[];
  paymentType: any[] = [];
  creditSaleDuration: any;
  currentUser:any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private factorCrudService: FactorCrudService,
              private factorItemService: FactorItemService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              public cartCrudService: CartCrudervice,
              private spinner: NgxSpinnerService,
              private shereCustomService: ShereCustomService,
              private modal: NgbActiveModal,
              private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.route.queryParams.subscribe(
      (data) => {
        this.factorId = data.factorId;
        this.factorNumber = data.factorNumber;
        this.order = data.order;

      }
    );
    this.fetchFactorItem();
    this.spinner.show();
    this.shereCustomService.get('GetFactorStateEnumForCombo').subscribe((res: any) => {
        this.factorState = res.result;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
    window.scrollTo(0, 0);
    this.checkFactorSupplierPolicies();

  }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  checkFactorSupplierPolicies() {
    let params = new HttpParams();
    params = params.set('factorId', this.factorItems[0].id);
    this.factorCrudService.get('CheckFactorSupplierPolicies2', params).subscribe((res: any) => {
      this.paymentType = res.result.model;
    });
  }

  fetchFactorItem() {
    
    const data = {
      factorId: +this.factorId,
      factorNumber: this.factorNumber,
      customerId: this.currentUser.id

    };
    this.spinner.show();
    this.factorCrudService.post('FetchFactorWithItem', data).subscribe(
      (res: any) => {


        this.factorItems = res.result;
        this.spinner.hide();

      }, () => {
        this.spinner.hide();
      }
    );
  }

  findTitel(value) {
    return this.factorState?.find(x => +x.value === value).displayText;
  }

  cancelFactorItem(id) {
    const data = {
      factorItemId: id,
      description: ''
    };
    this.factorItemService.post('CancelByConsumer', data).subscribe(
      (res) => {
        this.toastr.success('آیتم انتخابی با موفقیت از فاکتور حذف شد');
        if (this.factorItems.length == 1) {
          this.router.navigate(['/factor']);
        }
      }
    );
  }


  cancelFactor(item) {

    const ref = this.modalService.open(ReasonForCancelingComponent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
    ref.result.then((result) => {

    }, (reason) => {

    });
    ref.componentInstance.description.subscribe((cancelDescription) => {
      if (cancelDescription) {
        const data = {
          factorId: item.factorId,
          orderId: item.id,
          cancelDescription: cancelDescription.toString()
        };
        this.spinner.show();
        this.factorCrudService.post('CancelFactor', data).subscribe(
          (res: any) => {
            if (res.result.isSuccessful) {
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

  selectPayType(item) {
    this.payType = item.value;
    this.creditSaleDuration = item.creaditSaleDuration;
  }

  pay(item) {

    if (this.payType == undefined || this.payType == null) {
      this.toastr.error('لطفا نوع پرداخت را مشخص کنید');
    } else {
      const data = {
        factorNumber: item.factorNumber,
        paymentType: this.payType,
        callbackUrl: 'https://otamin.ir/#/factor/factor-list?status:"StatusCode"&message: "Message"'
      };
      this.spinner.show();
      this.factorCrudService.post('PayFactorManual', data).subscribe(
        (res: any) => {
          if (res.result.responseCode === '-1') {
            this.close();
            const ref = this.modalService.open(PaymentTypeComponent, {ariaLabelledBy: 'modal-basic-title', size: 'md'});

            ref.result.then((result) => {

            }, (reason) => {

            });
          } else {
            this.spinner.hide();
            if (this.payType == '1') {
              if (res.result.model.error_log !== null) {
                this.toastr.error(res.result.model.error_log);

              } else {
                window.open(res.result.model.link, '_self');

              }
            } else {
              // this.statusEmit.emit(true);
              this.toastr.success('سفارش شما با موفقیت ثبت شد');
              this.router.navigate(['/home']);

            }
          }
        }, () => {
          this.spinner.hide();
          this.toastr.error('خطایی رخ داده است !');
        }
      );

    }
  }

  close() {
    this.modal.dismiss();
  }
}
