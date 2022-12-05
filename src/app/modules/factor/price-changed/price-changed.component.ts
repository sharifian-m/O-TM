import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ReasonForCancelingComponent} from '../../../shared/reason-for-canceling/reason-for-canceling.component';
import {FactorCrudService} from '../../../core/services/factor/factor.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {CartCrudervice} from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-price-changed',
  templateUrl: './price-changed.component.html',
  styleUrls: ['./price-changed.component.scss']
})
export class PriceChangedComponent implements OnInit {
  item: any;
  @Output() isCanceling = new EventEmitter<boolean>();

  constructor(private modal: NgbActiveModal,
              private modalService: NgbModal,
              private factorCrudService: FactorCrudService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              public cartCrudService: CartCrudervice) {
  }

  ngOnInit(): void {
  }

  close(flag?: boolean) {
    this.modal.close(flag);

  }

  cancelFactor() {
    this.modal.close();
    const ref = this.modalService.open(ReasonForCancelingComponent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
    ref.result.then((result) => {

    }, (reason) => {

    });
    ref.componentInstance.description.subscribe((cancelDescription) => {
      if (cancelDescription) {

        const data = {
          factorId: this.item?.id,

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
            ref.componentInstance.isResponseReason.subscribe((isReason) => {
              this.isCanceling.emit(true);
            });
          }, () => {
            this.spinner.hide();
          }
        );
      }
    });
  }
}
