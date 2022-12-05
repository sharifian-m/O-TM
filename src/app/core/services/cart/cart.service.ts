import {Injectable, Injector, Input} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpService} from '../http.service';
import {HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartCrudervice extends HttpService {
  user: any;
  cartData: any[] = [];
  cartCount = 0;
  factors: any[] = [];
  cartDataLength = 0;
  currentUser:any;
  defaultStoreId:any;

  $basketBySupplierSubject: BehaviorSubject<any>;
  $currentBasketBySupplier: Observable<any>;

  $basketCountSubject: BehaviorSubject<number>;
  $currentBasketCount: Observable<number>;

  constructor(injector: Injector ,private authService: AuthService,) {
    super(injector, 'CartCrud');
    this.$basketBySupplierSubject = new BehaviorSubject<any>((JSON?.parse(<any>localStorage.getItem('basket')))?(JSON?.parse(<any>localStorage.getItem('basket'))):'');
    this.$currentBasketBySupplier = this.$basketBySupplierSubject.asObservable();

    this.$basketCountSubject = new BehaviorSubject<number>((JSON?.parse(<any>localStorage.getItem('basketCount')))?(JSON?.parse(<any>localStorage.getItem('basketCount'))):0);
    this.$currentBasketCount = this.$basketCountSubject.asObservable();
  }

  GetCartBySupplier() {
    this.getCurrentUser();
    this.getDefaultStoreId();
    let params = new HttpParams();
    params = params.set('CustomerId', this.currentUser.id).set('cartType', '0').set('storeId',  this.defaultStoreId);
    return this.http.get(`${environment.baseUrl}${this.controller}/GetCartBySupplier`, {params});
    
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
  cartItemsCount(cartItems) {
    this.cartCount = 0;
    if(cartItems){
      cartItems.map((item) => {
        this.cartCount += item.items.length;
      });
      this.storeCartCount( this.cartCount);
    }
     
  }
 
  storeCartCount(cartCount:any){
    
    localStorage.setItem('basketCount',JSON.stringify(cartCount ));
  
    this.$basketCountSubject.next(cartCount);
  }
  storeBasketBySupplier(basketItems){
localStorage.setItem('basket', JSON.stringify(basketItems));

this.$basketBySupplierSubject.next(basketItems);
this.cartItemsCount(basketItems);

  }
  
}
