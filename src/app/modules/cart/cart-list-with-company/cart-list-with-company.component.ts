import {HttpParams} from '@angular/common/http';
// import {templateJitUrl} from '@angular/compiler';
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {finalize} from 'rxjs/operators';
import {error} from 'protractor';
import {ShereCustomService} from '../../../core/services/share-custom/share-custom.service';
import {log} from 'util';
import {
  TermsAndConditionsModaleComponent
} from '../../product-list-filter/terms-and-conditions-modale/terms-and-conditions-modale.component';
import {ItemRequiredRoleCodeDialogComponent} from '../item-required-role-code-dialog/item-required-role-code-dialog.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ReasonForCancelingComponent} from '../../../shared/reason-for-canceling/reason-for-canceling.component';
import {UploadDocumentsComponent} from '../../../shared/upload-documents/upload-documents.component';
import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-cart-list-with-company',
  templateUrl: './cart-list-with-company.component.html',
  styleUrls: ['./cart-list-with-company.component.scss']
})
export class CartListWithCompanyComponent implements OnInit {
  @Output('sendStep') sendStep = new EventEmitter();

  @Output('sendData') sendData = new EventEmitter();
  companyItem: any[] = [];
  totalPrice = 0;
  companyItemDetail: any[] = [];
  totalCount = 0;
  unitList: any[];
  showCompanyItem = false;
  defaultStoreId:any
  nextStepDisabled = false;
  currentUser:any;
  cartCount:any;
  cartItems:any;
  constructor(private cartCrudService: CartCrudervice,
              private spinner: NgxSpinnerService,
              private router: Router,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private shereCustomService: ShereCustomService,
              private authService: AuthService
  ) {
  }

  ngOnInit(): void {
 this.getCurrentUser();
 this.getDefaultStoreId();
    window.scrollTo(0,0);
    this.getUnitList();
    this.getCartBysupplier()
    this.getProfile();

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
  
 getUnitList(){
  this.shereCustomService.get('GetUnitEnumForCombo').subscribe((res: any) => {
    this.unitList = res.result;
  }
);
 }

  getCartBysupplier(){
    if (this.currentUser) {
    if ( this.defaultStoreId !== null &&  this.defaultStoreId !== undefined) {
      
        this.cartCrudService.$currentBasketBySupplier.subscribe(res=>{
          this.cartItems=res;
          console.log('res',res);
          
          if(this.cartItems.length>0){
          this.calcTotalCount(this.cartItems);
          this.calcTotalPrice(this.cartItems);
          this.cartCrudService.cartItemsCount(this.cartItems)
        }
        else{
this.showCompanyItem = true; 
}
         });
    }
    else {
      this.toastr.info('فروشگاه پیش فرض خود را انتخاب نکرده اید');
    }
  } else {
    this.toastr.info('لطفا وارد حساب کاربری خود شوید');
  }
   }
   
   calcTotalPrice(cartItems){
    this.totalPrice = 0;
    cartItems.map(x=>{
      x.items.map( x=>{ 
        this.totalPrice +=Number(x.supplierItem.valuePerUnit) * x.supplierItem.sellPrice*x.count;}
     
    )

    })
   }
   calcTotalCount(cartItems){
    this.totalCount = 0;
    cartItems.map(x=>{
      this.totalCount += x.cartItemCount;
    })
    
  }
 
   
  findUnitTitel(unitId): string {
    return this.unitList?.find(x => +x.value === unitId).displayText;
  }

  

  cartCompanyDetail(id) {
    this.spinner.show();
    const data = {
      supplierIdentifier: id,
      carttype: 0,
      itemIds: this.cartCrudService.cartData.map(item => {
        return {
          itemId: item.id,
          count: item.count !== 0 ? item.count : item.minimuneOrderCount
        };
      })
    };

  }

  onChangeCount(count: number, minimumCont: number, maximumCount: number, price: number, totalPrice, index, item, supplier) {

    
   
    if (this.defaultStoreId !== null && this.defaultStoreId !== undefined) {

      const data = {
        count,
        id: item.cartId,
        customerId: this.currentUser.id,
        itemId: item.itemId,
        cartType: 0,
        paymentType: 1,
        supplierId: supplier.supplierId,
        storeId:this.defaultStoreId
      };
      this.cartCrudService.post('edit', data).subscribe(
        (res) => {
          this.CartBySupplier();

        }, (e) => {
          console.log(e);
        }
      );
    } else {

      this.toastr.info('فروشگاه پیش فرض خود را انتخاب نکرده اید');
    }
  }



  getProfile() {
    this.spinner.show();
 
    this.authService.getProfile(this.currentUser.mobileNumber).subscribe(
      (res: any) => {
        res.result.model.storeOutputDtos.forEach(item => {

          if (item.isDefault === true) {
            if (item.uploadBusinessLicense !== null) {

            } else {
              this.shereCustomService.nextStepDisabled = true;
            }
          } else {

          }
        });
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      });
  }

  nextStep() {

    if (localStorage.getItem('roleCode') === 'null') {
      const listItemRequiredRoleCode = [];
      this.companyItem.map(item =>
        item.items.filter(
          (items) => {
            if (items.supplierItem.requiredRoleCode === true) {
              listItemRequiredRoleCode.push(items);
            }
          }
        )
      );

      if (listItemRequiredRoleCode.length) {
        const ref = this.modalService.open(ItemRequiredRoleCodeDialogComponent,
          {ariaLabelledBy: 'modal-basic-title', size: 'md', keyboard: false, centered: true, scrollable: true}
        );

        ref.result.then((result) => {
        }, (reason) => {

        });
        ref.componentInstance.itams = listItemRequiredRoleCode;
      } else {
        this.sendData.emit(this.companyItem);
        this.sendStep.emit('next');
      }

    } else {
      this.sendData.emit(this.companyItem);
      this.sendStep.emit('next');
    }


  }

  goToProductDetail(id,title) {

    this.router.navigate(['/product-list/product-detail', {id:id , title:title}]);

    // this.router.navigate(['/product-list/product-detail', {id:id , count:count}]);
  }

  deleteBasket(id) {

    this.cartCrudService.post(`rem?id=${id}`, {}).subscribe(
      (res) => {
       
       this.CartBySupplier();
   

      }
    );

  }

  CartBySupplier(){
    
    this.cartCrudService.GetCartBySupplier().subscribe((res:any)=>{
   
      this.cartItems=res.result.model;
          
      if( this.cartItems.length > 0){
      
        this.cartCrudService.storeBasketBySupplier(this.cartItems);
        this.calcTotalCount(this.cartItems);
        this.calcTotalPrice(this.cartItems);
     
      }
      else if( this.cartItems.length === 0){

        this.cartItems = [];
        this.cartCrudService.storeBasketBySupplier(this.cartItems);
        this.showCompanyItem = true; 
        }
    });
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
    this.cartCrudService.post('InsertRange', model).subscribe(
      (res) => {

      }
    );
  }
}
