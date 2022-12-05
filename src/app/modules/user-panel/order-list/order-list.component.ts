import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {FactorCrudService} from 'src/app/core/services/factor/factor.service';
import {orderCrudService} from 'src/app/core/services/order/order.service';
import {ConfirmComponent} from '../../../shared/confirm/confirm.component';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ReasonForCancelingComponent} from '../../../shared/reason-for-canceling/reason-for-canceling.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  showOrder1 = true;
  showOrder2 = false;
  showOrder3 = false;
  showOrder4 = false;
  showOrder5 = false;
  showOrder6 = false;
  active = 1;
  page = 1;
  q1 = 1;
  q2 = 1;
  q3 = 1;
  q4 = 1;
  q5 = 1;
  q6 = 1;
  totalCount: number;
  totalCount1: number;
  totalCount2: number;
  totalCount3: number;
  totalCount4: number;
  totalCount5: number;
  totalCount6: number;
  orderCounts: any[] = [];
  order1: any[] = [];
  order2: any[] = [];
  order3: any[] = [];
  order4: any[] = [];
  order5: any[] = [];
  order6: any[] = [];
  orders: any[] = [];
  currentUser:any;
//d
  constructor(
    private orderCrudService: orderCrudService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
  ) {
  }


  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllOrder1();
    this.getCustomerOrderCounts();

  }

  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }

  pageChanged1(event) {
    this.q1 = event;
    this.getAllOrder1();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  pageChanged2(event) {
    this.q2 = event;
    this.getAllOrder2();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  pageChanged3(event) {
    this.q3 = event;
    this.getAllOrder3();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  pageChanged4(event) {
    this.q4 = event;
    this.getAllOrder4();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  pageChanged5(event) {
    this.q5 = event;
    this.getAllOrder5();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  pageChanged6(event) {
    this.q6 = event;
    this.getAllOrder6();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getCustomerOrderCounts() {
    this.spinner.show();

    let params = new HttpParams();


    params = params.set('customerId', this.currentUser.id);
    this.orderCrudService.get('GetCustomerOrderCounts', params).subscribe(
      (res: any) => {
        this.orderCounts = res.result;

        this.spinner.hide();

      }, () => {
        this.spinner.hide();
      }
    );
  }

  navChange(e?) {
    if (e) {
      this.active = e.nextId;
    }
    switch (this.active) {
      case 1: {
        this.getAllOrder1();
        this.showOrder1 = true;
        this.showOrder2 = false;
        this.showOrder3 = false;
        this.showOrder4 = false;
        this.showOrder5 = false;
        this.showOrder6 = false;

        break;
      }
      case 2: {
        this.getAllOrder2();
        this.showOrder1 = false;
        this.showOrder2 = true;
        this.showOrder3 = false;
        this.showOrder4 = false;
        this.showOrder5 = false;
        this.showOrder6 = false;
        break;
      }
      case 3: {
        this.getAllOrder3();
        this.showOrder1 = false;
        this.showOrder2 = false;
        this.showOrder3 = true;
        this.showOrder4 = false;
        this.showOrder5 = false;
        this.showOrder6 = false;

        break;
      }
      case 4: {
        this.getAllOrder4();
        this.showOrder1 = false;
        this.showOrder2 = false;
        this.showOrder3 = false;
        this.showOrder4 = true;
        this.showOrder5 = false;
        this.showOrder6 = false;

        break;
      }
      case 5: {
        this.getAllOrder5();
        this.showOrder1 = false;
        this.showOrder2 = false;
        this.showOrder3 = false;
        this.showOrder4 = false;
        this.showOrder5 = true;
        this.showOrder6 = false;
        break;
      }
      case 6: {
        this.getAllOrder6();
        this.showOrder1 = false;
        this.showOrder2 = false;
        this.showOrder3 = false;
        this.showOrder4 = false;
        this.showOrder5 = false;
        this.showOrder6 = true;
        break;
      }
      default: {
        this.getAllOrder1();
        this.showOrder1 = true;
        this.showOrder2 = false;
        this.showOrder3 = false;
        this.showOrder4 = false;
        this.showOrder5 = false;
        this.showOrder6 = false;
        break;
      }
    }
  }

  getAllOrder1() {
    this.spinner.show();
    
    let params = new HttpParams();
    const skipCount = 10 * (this.q1 - 1);

    params = params.set('customerId', this.currentUser.id).set('OrderState', '1').set('maxResultCount', '10').set('skipCount', skipCount.toString());
    this.orderCrudService.get('GetWithDetails', params).subscribe(
      (res: any) => {
        this.order1 = res.result.items;
        this.totalCount1 = res.result.totalCount;
        this.spinner.hide();

      }, () => {
        this.spinner.hide();
      }
    );
  }

  getAllOrder2() {
    this.spinner.show();
 
    let params = new HttpParams();
    const skipCount = 10 * (this.q2 - 1);
    params = params.set('customerId',this.currentUser.id).set('OrderState', '2').set('maxResultCount', '10').set('skipCount', skipCount.toString());
    ;
    this.orderCrudService.get('GetWithDetails', params).subscribe(
      (res: any) => {
        this.order2 = res.result.items;
        this.totalCount2 = res.result.totalCount;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
  }

  getAllOrder3() {
    this.spinner.show();
   
    let params = new HttpParams();
    const skipCount = 10 * (this.q3 - 1);
    params = params.set('customerId', this.currentUser.id).set('OrderState', '3').set('maxResultCount', '10').set('skipCount', skipCount.toString());
    ;
    this.orderCrudService.get('GetWithDetails', params).subscribe(
      (res: any) => {
        this.order3 = res.result.items;
        this.totalCount3 = res.result.totalCount;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
  }

  getAllOrder4() {
    this.spinner.show();

    let params = new HttpParams();
    const skipCount = 10 * (this.q4 - 1);
    params = params.set('customerId', this.currentUser.id).set('OrderState', '4').set('maxResultCount', '10').set('skipCount', skipCount.toString());
    ;
    this.orderCrudService.get('GetWithDetails', params).subscribe(
      (res: any) => {
        this.order4 = res.result.items;
        this.totalCount4 = res.result.totalCount;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
  }

  getAllOrder5() {
    this.spinner.show();

    let params = new HttpParams();
    const skipCount = 10 * (this.q5 - 1);
    params = params.set('customerId', this.currentUser.id).set('OrderState', '5').set('maxResultCount', '10').set('skipCount', skipCount.toString());
    ;
    this.orderCrudService.get('GetWithDetails', params).subscribe(
      (res: any) => {
        this.order5 = res.result.items;
        this.totalCount5 = res.result.totalCount;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
  }

  getAllOrder6() {
    this.spinner.show();
   
    let params = new HttpParams();
    const skipCount = 10 * (this.q6 - 1);
    params = params.set('customerId', this.currentUser.id).set('OrderState', '6').set('maxResultCount', '10').set('skipCount', skipCount.toString());
    ;
    this.orderCrudService.get('GetWithDetails', params).subscribe(
      (res: any) => {
        this.order6 = res.result.items;
        this.totalCount6 = res.result.totalCount;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
  }

  getOrder() {
    this.spinner.show();
  
    let params = new HttpParams();
    params = params.set('customerId', this.currentUser.id);
    this.orderCrudService.get('GetUserOrderFactor', params).subscribe(
      (res: any) => {
        this.orders = res.result;
        this.totalCount = res.result.totalCount;
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
        this.orderCrudService.post('CancelByConsumer', data).subscribe(
          (res: any) => {

            if (res.result.isSuccessful != null && res.result.isSuccessful) {
              this.toastr.success('سفارش با موفقیت لغو شد');
              this.getOrder();
              this.getAllOrder1();
              this.navChange();
              this.getCustomerOrderCounts();
            } else if (res.result.responseCode == '-3') {
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
}
