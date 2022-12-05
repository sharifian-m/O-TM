import {HttpParams} from '@angular/common/http';
import {Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {ToastrService} from 'ngx-toastr';
import {ShereCustomService} from '../../../core/services/share-custom/share-custom.service';

@Component({
  selector: 'app-accept-cart-list-with-company',
  templateUrl: './accept-cart-list-with-company.component.html',
  styleUrls: ['./accept-cart-list-with-company.component.scss']
})
export class AcceptCartListWithCompanyComponent implements OnInit {
  @Output('sendStep') sendStep = new EventEmitter();
  // @Input() companyItem: any[] = [];
  isLoad = false;
  companyItem: any[] = []
  isUserHasNationalCode = false;
  mandatoryNationalCode = false;
currentUser:any;
defaultStoreId:any;
  constructor(private cartCrudService: CartCrudervice,
              private authService: AuthService,
              private toastrService: ToastrService,
              private spinner: NgxSpinnerService,
              private shareCustomService: ShereCustomService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
   this.getDefaultStoreId();
    window.scrollTo(0, 0);
    this.getCartByCompny();

  }
getCurrentUser(){
  this.authService.$currentUser.subscribe(res=>{
    this.currentUser=res;
  });
}
  getDefaultStoreId(){
    this.authService.$currentStoreDefaultId.subscribe(res=>{
      this.defaultStoreId=res
  });
  }
  getCartByCompny() {

    if (this.defaultStoreId !== null && this.defaultStoreId !== undefined) {
      
      
      this.spinner.show();
     
      this.cartCrudService.$currentBasketBySupplier.subscribe(res=>{
        this.isLoad = true;
        this.companyItem = res;
console.log('this.companyItem ',this.companyItem );

        this.companyItem.map(
          (item) => {
            if (item.mandatoryNationalCode) {
              item.mandatoryNationalCode = true;
            } else {
              item.mandatoryNationalCode = false;
            }
          }
        );
        this.checkNationalCode();
          this.spinner.hide();
        }, () => {
          this.spinner.hide();
      }
      );
    } else {

      this.toastrService.info('فروشگاه پیش فرض خود را انتخاب نکرده اید');
    }
  }

  checkNationalCode() {
   
        if (this.currentUser.nationalCode != null) {
          this.isUserHasNationalCode = true;
        } else {
          this.isUserHasNationalCode = false;
        }

  }

  insertCart() {

    const model = this.cartCrudService.cartData.map(
      (item) => {
        return {
          itemId: item.id,
          cartType: 0,
          customerId: this.currentUser.id,
          count: item.count

        };
      }
    );
    this.spinner.show();
    this.cartCrudService.post('InsertRange', model).subscribe(
      (res) => {

        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
  }

  checkValidBuyAmount() {
    const valid = true;
    const data = this.companyItem.filter(item => item.totalAmount <= item.maximumOrderAmount && item.totalAmount >= item.minimumOrderAmount);
    if (data.length == 0) {
      return true;
    }
    // this.companyItem.map(
    //   (item)=>{
    //     if(item.totalAmount<=item.maximumOrderAmount && item.totalAmount>= item.minimumOrderAmount){
    //    valid=true
    //     }else{
    //     valid=false
    //     }
    //   }
    // )
    return false;
  }

  nextStep() {
    // this.insertCart()
    this.sendStep.emit('next2');

  }

  prevStep() {
    this.sendStep.emit('prev');

  }
}
