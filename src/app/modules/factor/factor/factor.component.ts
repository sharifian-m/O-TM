import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {FactorCrudService} from 'src/app/core/services/factor/factor.service';
import {ReasonForCancelingComponent} from '../../../shared/reason-for-canceling/reason-for-canceling.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-factor',
  templateUrl: './factor.component.html',
  styleUrls: ['./factor.component.scss']
})
export class FactorComponent implements OnInit {
  stores: any[] = [];
  factors: any[] = [];
  store: any;
  currentUser:any;
  constructor(private authService: AuthService,
              private catCrudService: CartCrudervice,
              private factorCrudService: FactorCrudService,
              private router: Router,
              private toastrService: ToastrService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getCurrentUser();
    if (this.authService.isAuth) {
      this.getProfile();
    }
  }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  getProfile() {

          this.currentUser.storeOutputDtos.map(
          (item) => {
            if (item.authState == 'Active') {
              this.stores = this.currentUser.storeOutputDtos;

            }
        
      }
    );
  }

  changeStore(event) {
    this.store = event.target.value;
  }

  createFactor() {
    if (this.store) {
     
      const data = {
        customerId: this.currentUser.id,
        storeId: Number(this.store)
      };
      this.catCrudService.post('CartToFactor', data).subscribe(
        (res: any) => {
          this.factors = res.result.model;
        }, (e) => {
          if (e.error.error.code === -2) {
            this.toastr.error(e.error.error.message);
            this.router.navigate(['/user-panel/my-store']);
          } else if (e.error.error.code === -3) {
            this.toastr.error(e.error.error.message);
            this.router.navigate(['/user-panel/edit-profile']);
          } else {
            // this.spinner.hide();
            console.log(e);
            this.toastr.error(e.error.error.message);
          }
      }
      );
    } else {
      this.toastrService.error('لطفا فروشگاه مورد نظر خود را انتخاب کنید');
    }

  }

  factorDetail(factorId, factorNumber) {
    this.router.navigate(['/order-detail'], {queryParams: {factorId: factorId, factorNumber: factorNumber}});
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
          (res) => {
            this.toastrService.success('آیتم انتخابی با موفقیت لغو شد');
            this.spinner.hide();
          }, () => {
            this.spinner.hide();
          }
        );
      }
    });
  }
}
