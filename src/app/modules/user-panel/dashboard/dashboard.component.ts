import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {FactorCrudService} from 'src/app/core/services/factor/factor.service';
import {orderCrudService} from 'src/app/core/services/order/order.service';
import {ConfirmComponent} from '../../../shared/confirm/confirm.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {PaymentTypeComponent} from '../../factor/payment-type/payment-type.component';
import {ReasonForCancelingComponent} from '../../../shared/reason-for-canceling/reason-for-canceling.component';
import {PriceChangedComponent} from '../../factor/price-changed/price-changed.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  orderListId = 'orderListId';
  factorListId = 'factorListId';
  factors: any[] = [];
  active = 1;
  page = 1;
  q1 = 1;
  q2 = 1;
  totalCountFactors: number;
  totalCount: number;
  totalCount1: number;

  orderCounts: any[] = [];
  order1: any[] = [];
  private dontPay = true;

  currentUser:any;
  constructor(private orderService: orderCrudService,
              private factorCrudService: FactorCrudService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private router: Router,
              private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllFactor();
    this.getAllOrder1();
    this.getCustomerOrderCounts();
  }

  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  getAllFactor() {
    this.spinner.show();
   
    const skipCount = 5 * (this.q2 - 1);


    const data = {
      customerId: this.currentUser.id,
      skipCount: skipCount.toString(),
      maxResultCount: 5
    };
    this.factorCrudService.post('FetchFactorWithItemPaging2', data).subscribe(
      (res: any) => {
        this.factors = res.result.items;
        this.totalCountFactors = res.result.totalCount;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();

      }
    );
  }


  getCustomerOrderCounts() {
    this.spinner.show();
  
    let params = new HttpParams();


    params = params.set('customerId', this.currentUser.id);
    this.orderService.get('GetCustomerOrderCounts', params).subscribe(
      (res: any) => {
        this.orderCounts = res.result;

        this.spinner.hide();

      }, () => {
        this.spinner.hide();
      }
    );
  }

  getAllOrder1() {
    this.spinner.show();
 
    let params = new HttpParams();
    const skipCount = 5 * (this.q1 - 1);

    params = params.set('customerId', this.currentUser.id).set('OrderState', '1').set('maxResultCount', '5')
      .set('skipCount', skipCount.toString());
    this.orderService.get('GetWithDetails', params).subscribe(
      (res: any) => {
        this.order1 = res.result.items;
        this.totalCount1 = res.result.totalCount;
        this.spinner.hide();

      }, () => {
        this.spinner.hide();
      }
    );
  }

  orderDetail(item) {
    this.router.navigate(['user-panel/order-detail'], {
      queryParams: {
        factorId: item.factorId,
        factorNumber: item.factorNumber,
        orderState: item.orderState
      }
    });
  }

  factorDetail(item, factorNumber) {
    if (item.factorState !== 2) {
      this.router.navigate(['/factor/factor-detail'], {queryParams: {item, factorNumber}});
    }
  }

  cancelOrder(item) {

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
        this.orderService.post('CancelByConsumer', data).subscribe(
          (res: any) => {

            if (res.result.isSuccessful != null && res.result.isSuccessful) {
              this.toastr.success('سفارش با موفقیت لغو شد');
              // this.navChange();
              this.getCustomerOrderCounts();
              this.getAllOrder1();
            } else if (res.result.responseCode === '-3') {
              this.toastr.info(res.result.reponseDescription);
            } else {
              this.toastr.warning(res.result.reponseDescription);
            }

            this.spinner.hide();
          }, () => {
            this.spinner.hide();
            this.toastr.error('خطایی رخ داده است ');
          }
        );
      }

    });
  }

  cancelFactor(item) {
    const ref = this.modalService.open(ReasonForCancelingComponent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
    ref.result.then((result) => {
      this.getAllFactor();
    }, (reason) => {

    });
    ref.componentInstance.description.subscribe((cancelDescription) => {
      if (cancelDescription) {
        const data = {
          factorId: item.id,
          cancelDescription: cancelDescription.toString()
        };
        this.spinner.show();
        this.factorCrudService.post('CancelFactor', data).subscribe(
          (res: any) => {
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
      this.getAllFactor();
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
    this.q2 = event;
    this.getAllFactor();
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'smooth'
    });
  }

  pageChangedOrder(event) {
    this.q1 = event;
    this.getAllOrder1();
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'smooth'
    });
  }
}
