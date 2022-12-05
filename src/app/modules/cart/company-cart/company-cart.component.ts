import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CartCrudervice } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-company-cart',
  templateUrl: './company-cart.component.html',
  styleUrls: ['./company-cart.component.scss']
})
export class CompanyCartComponent implements OnInit {
  totalPrice: number;
  companyItem: any[] = [];
  isShowLogin = false;
  currentUser:any;
  defaultStoreId:any;
  cartItems:any;
  cartCount:number=0;
  constructor(public  cartCrudService: CartCrudervice,
              private router: Router,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getDefaultStoreId();
    this.getBuyBasket();
    this.cartCrudService.cartData.map(
      (item, index) => {
       return Object.assign(item, {totalPrice: item.minimuneOrderCount * item.sellPrice * item.valuePerUnit, count: item.count ? item.count : item.minimuneOrderCount});
      }
    );
    if (!this.currentUser){
      this.getCartByCompnyClient();
    }else{
      this.getCartByCompny();

    }
  }
  getBuyBasket() {


    if (this.defaultStoreId !== null && this.defaultStoreId !== undefined) {
     this.cartCrudService.$currentBasketBySupplier.subscribe(res=>{
       this.cartItems = res;
       
      });
    
     this.cartCrudService.storeBasketBySupplier(this.cartItems );
    this.countCartBysupplier();
   }
   else {
    this.toastr.info('فروشگاه پیش فرض خود را انتخاب نکرده اید');
   }
   
       }
       countCartBysupplier() {
        this.cartCrudService.$currentBasketCount.subscribe(res=>{
        this.cartCount=res;
        
       });
    
    }
  getDefaultStoreId(){
    this.authService.$currentStoreDefaultId.subscribe(res=>{
     this.defaultStoreId=res
    });
 }
 getCurrentUser(){
  this.authService.$currentUser.subscribe(res=>{
    this.currentUser=res;
  });

}
  getCartByCompnyClient(){
    this.spinner.show();
    const data = {
      itemIds: this.cartCrudService.cartData.map(item => {
        return{
          itemId: item.id,
          count: item.count
        };
      })
    };
    this.cartCrudService.post('postCartByCompanyClient', data).subscribe(
      (res: any) => {
      this.companyItem = res.result.model.cartClientItemsClient;
      this.totalPrice = res.result.model.totalAmount;
      this.spinner.hide();
      }, () => {
        this.spinner.hide();
      });
  }
  getCartByCompny(){
    
    if (this.defaultStoreId !== null && this.defaultStoreId !== undefined) {
      this.spinner.show();

      let params = new HttpParams();
      params = params.set('customerId', this.currentUser.id).set('cartType', '0').set('storeId', this.defaultStoreId);
      this.cartCrudService.get('getCartByCompany', params).subscribe(
        (res: any) => {
          this.companyItem = res.result.model.cartClientItemsClient;
          this.totalPrice = res.result.model.totalAmount;
          this.spinner.hide();
        }, () => {
          this.spinner.hide();
        }
      );
    }else {

      this.toastr.info('لطفا فروشگاه پیش فرض خود را اضافه کنید.');
    }
  }

  cartCompanyDetail(item){
       this.cartCrudService.cartData = JSON.parse(window.localStorage.getItem('basket'));
       this.router.navigate(['/cart/cart-item', item.supplierIdentifier]);
  }
  checkValidTotalPrice(item){
   if (item.totalAmount >= item.minimumOrderAmount && item.totalAmount <= item.maximumOrderAmount){
   return true;
   }
   return false;
  }
  buyerTotal(){
    if (this.companyItem.length === 1 && !this.checkValidTotalPrice(this.companyItem[0])){
     this.toastr.error('مبلغ کل باید بین حداقل و حداکثر مبلغ باشد') ;
     return;
    }
    if (!this.authService.isAuth){
      this.isShowLogin = true;

    }else{
this.insertCart();
    }

  }
  insertCart(){
  
    const model = this.cartCrudService.cartData.map(
      (item) => {
        return{
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
           this.router.navigate(['/factor']);
           this.spinner.hide();
      }, () => {
        this.spinner.hide();
    }
    );
  }
  closeAuth(){
    this.isShowLogin = false;
  }
  closeLogin(event){
    this.isShowLogin = false;

  }
}
