import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {FactorCrudService} from 'src/app/core/services/factor/factor.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ShereCustomService} from '../../../core/services/share-custom/share-custom.service';
import {ConfirmComponent} from '../../../shared/confirm/confirm.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ReasonForCancelingComponent} from '../../../shared/reason-for-canceling/reason-for-canceling.component';
import {PaymentTypeComponent} from '../../factor/payment-type/payment-type.component';
import {OfferFactorService} from '../../../core/services/offerFactor/offer-factor.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-pay-factor',
  templateUrl: './pay-factor.component.html',
  styleUrls: ['./pay-factor.component.scss']
})
export class PayFactorComponent implements OnInit {
  @Output('sendStep') sendStep = new EventEmitter();
  payType: any;
  private factorState: any[];
  offerCode = '';
  paymentType: any[] = [];
  creditSaleDuration: any;
  private factorId: any;
  cartCount:any;
  constructor(public cartCrudService: CartCrudervice,
              private router: Router,
              private factorCrudService: FactorCrudService,
              private offerFactorService: OfferFactorService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private shereCustomService: ShereCustomService,
              private modalService: NgbModal,
              private modal: NgbActiveModal,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.shereCustomService.get('GetFactorStateEnumForCombo').subscribe((res: any) => {
        this.factorState = res.result;
      }
    );
    const factorsId = JSON?.parse(localStorage.getItem('factors'));
    window.scrollTo(0, 0);
    if (factorsId){
      this.checkFactorSupplierPolicies(factorsId);
    }
    
  }


  findTitel(value) {
    return this.factorState?.find(x => +x.value === value).displayText;
  }

  nextStep() {
    this.sendStep.emit('next2');

  }

  prevStep() {
    this.sendStep.emit('prev');

  }

  checkFactorSupplierPolicies(factorsId) {
    let params = new HttpParams();
    params = params.set('factorId', factorsId[0]?.id);
    if (this.cartCrudService.factors[0]?.id !== undefined) {
      this.factorCrudService.get('CheckFactorSupplierPolicies2', params).subscribe((res: any) => {
        this.paymentType = res.result.model;
     
      });
    }
  }

  selectPayType(item) {
    this.payType = item.value;
    this.creditSaleDuration = item.creaditSaleDuration;
  }

  pay(item) {

    if (this.payType === undefined) {
      this.toastr.error('???????? ?????? ???????????? ???? ???????? ????????');
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
            this.toastr.error(res.result.reponseDescription);
          } else {
            this.spinner.hide();
            if (this.payType === '1') {
              if (res.result.model.error_log !== null) {
                this.toastr.error(res.result.model.error_log);

              } else {
                window.open(res.result.model.link, '_self');

              }
            } else {
              // this.statusEmit.emit(true);
              this.toastr.success('?????????? ?????? ???? ???????????? ?????? ????');
              this.router.navigate(['/home']);

            }
          }
        }, () => {
          this.spinner.hide();
          this.toastr.error('?????????? ???? ???????? ?????? !');
        }
      );

    }
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
            if (res.result.isSuccessful) {
              this.toastr.success('???????? ?????????????? ???? ???????????? ?????? ????');
              window.localStorage.removeItem('basket');
              this.cartCrudService.storeBasketBySupplier([]);
              this.router.navigate(['/factor/factor-list']);
              this.spinner.hide();
            } else {
              this.toastr.error('?????? ???? ?????????? ??????????????');
              this.spinner.hide();
            }

          }, () => {
            this.spinner.hide();
          }
        );
      }
    });
  }

  close() {
    this.modal.dismiss();
  }

  applyOfferToFactor(item) {
    const data = {
      factorId: item.id,
      code: this.offerCode,
    };
    this.offerFactorService.applyOfferToFactor(data).subscribe((res: any) => {
      if (res.success) {
        this.cartCrudService.factors[0] = res.result;
        this.toastr.success('???? ?????????? ?????????? ????');
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
        this.cartCrudService.factors[0] = res.result;
        this.toastr.success('???? ?????????? ?????? ????');
      } else {
        this.toastr.error(res.result.error.message, '');
      }
    }, (error) => {
      this.toastr.error(error.error.error.message, '');

    });
  }
}
