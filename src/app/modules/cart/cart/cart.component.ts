import { isNgTemplate } from '@angular/compiler';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CartCrudervice } from 'src/app/core/services/cart/cart.service';
import { GeneralService } from 'src/app/core/services/general/general.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import Stepper from 'bs-stepper';
import { AcceptCartListWithCompanyComponent } from '../accept-cart-list-with-company/accept-cart-list-with-company.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit , AfterViewInit {
  @ViewChild('acceptCart') acceptCart: AcceptCartListWithCompanyComponent;
  totalPrice = 0;
  isShowLogin = false;
  companyItemDetail: any[] = [];
  id: string;
  companyItem: any[] = [];
  isLoad = false;
  currentUser:any;
  defaultStoreId:any;
  cartCount:any;
  cartItems:any;
  public  stepper: Stepper;
  constructor(public cartCrudService: CartCrudervice,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              private route: ActivatedRoute,
              private generalService: GeneralService,
              private spinner: NgxSpinnerService,
    ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getDefaultStoreId();
    // this.getBuyBasket();
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    });
    window.scrollTo(0, 0);

  
    this.getId();
    this.sumPrice();

  }
  getDefaultStoreId(){
    this.authService.$currentStoreDefaultId.subscribe(res=>{
     this.defaultStoreId=res;
     
    });
  }
 
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  ngAfterViewInit() {
  
  }


  onChangeCount(count: number, minimumCont: number, maximumCount: number, price: number, totalPrice, index, valuePerUnit, item){

  totalPrice = count * price * Number(valuePerUnit);
  const find = this.cartItems.findIndex(data => data.id == item.id);
  this.cartItems[find].count = count;
  window.localStorage.setItem('basket', JSON.stringify(this.cartItems));

  if (count <= minimumCont){
      this.toastr.error('تعداد انتخابی نباید کمتر از حداقل سفارش باشد');

    }
  if (count >= maximumCount){
      this.toastr.error('تعداد انتخابی نباید بیشتر از حداکثر سفارش باشد');

    }
  this.sumPrice();
  }
  sumPrice(){
    this.totalPrice = 0;
    if(this.cartItems){
      this.cartItems.map(
        (item) => {
  
          this.totalPrice += item.totalPrice;
        }
      );
    }
  }
  buyerTotal(){
    if (!this.authService.isAuth){
      this.isShowLogin = true;

    }else{
this.insertCart();
    }

  }
  closeAuth(){
    this.isShowLogin = false;
  }
  closeLogin(event){
    this.isShowLogin = false;

  }
  deleteBasket(id){
    let data = JSON.parse(window.localStorage.getItem('basket'));
    data = data.filter((data) => data.id != id);
    window.localStorage.setItem('basket', JSON.stringify(data));
    this.companyItemDetail = this.companyItemDetail.filter(item => item.item.id != id);
    this.cartCrudService.cartData = this.cartCrudService.cartData.filter(data => data.id != id);
    this.cartCount--;

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
    this.cartCrudService.post('InsertRange', model).subscribe(
      (res) => {
           this.router.navigate(['/factor']);
      }
    );
  }
  getId(){
    this.route.params.subscribe(
      (data) => {
        this.id = data.id;
        // this.cartCompanyDetail();
      }
    );
  }
  setCompanyItem(event){
    this.companyItem = event;
    console.log('this.companyItemDetail',event);
    this.acceptCart.checkValidBuyAmount();
  }
  cartCompanyDetail(){
    this.spinner.show();
    const data = {
      supplierIdentifier: this.id,
      carttype: 0,
      itemIds: this.cartCrudService.cartData.map(item => {
        return{
          itemId: item.id,
          count: item.count !== 0 ? item.count : item.minimuneOrderCount
        };
      })
    };

    this.cartCrudService.post('postCartByCompanyDetailclient', data).subscribe(
      (res: any) => {
         this.companyItemDetail = res.result.model;
         console.log('this.companyItemDetail',this.companyItemDetail);
         
         this.isLoad = true;
         this.spinner.hide();

      }, () => {
        this.spinner.hide();
      }
    );
  }
  gotoCart(){
    this.router.navigate(['/cart/']);
  }
  stepControl(type){
    window.scrollTo(0, 0);
    // tslint:disable-next-line:triple-equals
    if (type == 'next'){
      // tslint:disable-next-line:no-unused-expression
      if (this, this.authService.isAuth){
        this.stepper.next();

      }else{
        this.isShowLogin = true;
      }
    }else if (type == 'prev'){
      this.stepper.previous();

    }else if (type == 'next2'){
      this.stepper.to(4);
    }else if (type == 'prev2'){
      this.stepper.to(2);
    }

  }
}
