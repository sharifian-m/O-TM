import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {FactorCrudService} from 'src/app/core/services/factor/factor.service';
import {ShereCustomService} from '../../../core/services/share-custom/share-custom.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {OfferFactorService} from '../../../core/services/offerFactor/offer-factor.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {
  factorNumber: any;
  paymentSelect: any;
  item: any;
  offerCode = '';
  cartCount:any;
  paymentType: any[] = [
    {
      value: '1',
      displayText: 'آنلاین',
      isSelected: false
    }, {
      value: '3',
      displayText: 'نقدی (پرداخت در محل)',
      isSelected: false
    },


  ];
  @Output() statusEmit = new EventEmitter<boolean>();
  private payType: any;
  creditSaleDuration: any;

  constructor(private factorCrudService: FactorCrudService,
              private modal: NgbActiveModal,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private cartCrudService: CartCrudervice,
              private shareCustomService: ShereCustomService,
              private modalService: NgbModal,
              private offerFactorService: OfferFactorService,
  ) {
  }

  ngOnInit(): void {
    this.checkFactorSupplierPolicies();
  }

  save() {
    if (this.payType === undefined) {
      this.toastr.error('لطفا نوع پرداخت را مشخص کنید');
    } else {
      const data = {
        factorNumber: this.item.factorNumber,
        paymentType: this.payType,
        callbackUrl: 'https://otamin.ir/#/factor/factor-list?status:"StatusCode"&message: "Message"'

      };
      this.factorCrudService.post('PayFactorManual', data).subscribe(
      (res: any) => {
        if (res.result.responseCode === '-1') {
          this.toastr.error(res.result.reponseDescription);
        }
        else {
          this.spinner.hide();
          if (this.paymentSelect === '1') {
            if (res.result.model.error_log !== null) {
              this.toastr.error(res.result.model.error_log);
              this.modal.dismiss();
            } else {
              window.open(res.result.model.link, '_self');

            }
          } else {
            this.statusEmit.emit(true);
            this.toastr.success('سفارش شما با موفقیت ثبت شد');
            window.localStorage.removeItem('basket');
            this.cartCrudService.storeBasketBySupplier([]);
          
            this.close();
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

  checkFactorSupplierPolicies() {
    let params = new HttpParams();
    params = params.set('factorId', this.item.id);
    this.factorCrudService.get('CheckFactorSupplierPolicies2', params).subscribe((res: any) => {
      this.paymentType = res.result.model;
    });
  }

  selectPayType(item) {
    this.payType = item.value;
    this.creditSaleDuration = item.creaditSaleDuration;
  }

  applyOfferToFactor(item) {
    const data = {
      factorId: item.id,
      code: this.offerCode,
    };
    this.offerFactorService.applyOfferToFactor(data).subscribe((res: any) => {
      if (res.success) {
        this.item[0] = res.result;
        this.toastr.success('کد تخفیف اعمال شد');
        this.offerCode = '';
      } else {
        this.toastr.error(res.result.error.message, '');
        this.offerCode = '';
      }
    }, (error) => {
      this.toastr.error(error.error.error.message, '');
      this.offerCode = '';

    });
  }

  deleteOfferFromFactor(item) {
    this.offerFactorService.deleteOfferFactor('DeleteOfferFactor', item.offerFactor.id).subscribe((res: any) => {

      if (res.success) {
        this.item[0] = res.result;
        this.toastr.success('کد تخفیف حذف شد');
      } else {
        this.toastr.error(res.result.error.message, '');
      }
    }, (error) => {
      this.toastr.error(error.error.error.message, '');

    });
  }
}
