import {HttpParams} from '@angular/common/http';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {GeneralService} from 'src/app/core/services/general/general.service';
import {ProductService} from 'src/app/core/services/product/product.service';
import {SupplierPolicyService} from 'src/app/core/services/supplier-policy/supplier-policy.service';
import {SwiperOptions} from 'swiper';
import {BreadcrumbService} from 'xng-breadcrumb';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PaymentTypeComponent} from '../../factor/payment-type/payment-type.component';
import {TermsAndConditionsModaleComponent} from '../terms-and-conditions-modale/terms-and-conditions-modale.component';
import {ShereCustomService} from 'src/app/core/services/share-custom/share-custom.service';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  defaultStoreId:any
  numberOfOrder=0;
  currentUser:any;
  rating = 5;
  isShowLogin = false;
  supplierItems: any[] = [];
  classes = {};
  // isSubMenu = false;  
  isSubMenu2 = false;
  public config: PerfectScrollbarConfigInterface = {};
  newProduct: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween:20,
    autoplay: true,
    loop: true,
    speed: 500,
    grabCursor: true,
    slidesPerView:4,
    breakpoints: {
     // when window width is >= 768px
    768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
        // when window width is >= 1200px
      1200: {
        slidesPerView: 3,
        spaceBetween: 15
      },
      // when window width is >= 1440px
      1441: {
        slidesPerView:6 ,
        spaceBetween: 15
      },
        
    }
  };
  id: number;
  routeId = 'product-list';
  totalPrice = 0;
  produdctDetail: any;
  unitList: any;
  cartItems:number=0;
  countParam:any='';
  private _item: any;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartCrudService: CartCrudervice,
              private toastr: ToastrService,
              private router: Router,
   
              private modalService: NgbModal,
              private breadcrumbService: BreadcrumbService,
              public generalService: GeneralService,
              private spinnerService: NgxSpinnerService,
              private supplierPolicyService: SupplierPolicyService,
              private authService: AuthService,
              private shereCustomService: ShereCustomService
  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
    this.getDefaultStoreId(); 
    this.getUnitList();
    this.getCurrentUser();
    this.getProductId();

  
  }

  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }

getDefaultStoreId(){
  this.authService.$currentStoreDefaultId.subscribe(res=>{
   this.defaultStoreId=res;
   
  });
}
  getUnitList(){
   this.generalService.isLoadData = false;
    this.shereCustomService.get('GetUnitEnumForCombo').subscribe((res: any) => {
      this.unitList = res.result;
           
    },(err)=>{
      console.log('err',err);
      
    }
  );
}
getProductId(){
  
  this.route.params.subscribe(
    (params) => {
      this.id = params.id; 
      this.getProduct(this.id); 
    }
  );
}
  

  getProduct(productId) {
    this.spinnerService.show();
    let params = new HttpParams();
    params = params.set('itemId', productId);
    this.productService.get('GetItemComplete', params).subscribe(
      (res: any) => {
        console.log('GetItemComplete',res);
        
        if(res){
          this.produdctDetail = res.result.model;
        }
//  debugger
        
        this.routeId = productId;
       
        this.getSupplierItem();
      
        this.spinnerService.hide();
      

      }, 
      () => {
        this.spinnerService.hide();


        if (this.routeId !== 'product-list') {
          this.router.navigate(['product-list/product-detail', productId]);
        } else {
          this.router.navigate(['product-list']);
        }

      }
    );
  }

  findUnitTitel(unitId) {
    return this.unitList.find(x => +x.value == unitId).displayText;
  }

  getSupplierItem() {
    if (this.defaultStoreId == null || this.defaultStoreId == undefined || this.defaultStoreId === '') {
      this.getItemSuppliers(null);
    } else {
          
      this.getItemSuppliers(this.defaultStoreId);
    }

  }

  getItemSuppliers(storeIdDefault) {
    let params = new HttpParams();
    if (storeIdDefault) {
  
      
      params = params.set('ItemId', this.id).set('StoreId',storeIdDefault);

    } else {
      params = params.set('ItemId', this.id);

    }
    this.spinnerService.show();
    this.supplierPolicyService.get('GetItemSuppliers', params).subscribe(
      (res: any) => {
   
        
        this.supplierItems = res.result.items;
        this.classes = {
          'supplier-4-item': res.result.items.length > 3,
          'supplier-3-item': res.result.items.length === 3,
          'supplier-2-item': res.result.items.length === 2,
          'supplier-1-item': res.result.items.length === 1,
          'supplier-0-item': !res.result.items.length,
        };

        this.supplierItems = res.result.items.map(
          (item) => {
            return Object.assign(item, {count: item.itemDetails.minimuneOrderCount});
          }
        );
   
        
        this.spinnerService.hide();
      }, () => {
        this.spinnerService.hide();
        this.toastr.warning('خطا در دریافت اطلاعات تامین کنندگان');
      }
    );
  }

  productDetail(id:number ,title:string) {
    this.goTop();
    this.id = +id;   
     this.router.navigate(['/product-list/product-detail',{id:id , title:title}] );
    this.getSupplierItem();
  }

  goTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } 


  onChangeCount(count: number, minimumCont: number, maximumCount: number, index: number) {
    this.supplierItems[index].count = count;

    if (count <= minimumCont) {
      this.toastr.error('تعداد انتخابی نباید کمتر از حداقل سفارش باشد');

    }
    if (count >= maximumCount) {
      this.toastr.error('تعداد انتخابی نباید بیشتر از حداکثر سفارش باشد');

    }
    this.sumPrice();
  }

  sumPrice() {
    this.totalPrice = 0;
    this.cartCrudService.cartData.map(
      (item) => {

        this.totalPrice += item.totalPrice;
      }
    );
  }

  addToCartNew(item) {

  
    if (this.currentUser) {
   
      if (this.defaultStoreId !== null && this.defaultStoreId !== undefined) {

        const data = {
          id: 0,
          itemId: +this.id,
          supplierId: item.itemDetails.customerId,
          cartType: 0,
          customerId: this.currentUser.id,
          count: item.count,
          paymentType: 1,
          storeId:this.defaultStoreId
        };
        this.spinnerService.show();
        this.cartCrudService.post('AddToCart', data).subscribe(
          (res) => {
            console.log('addtocart res:',res);
            
            this.cartCrudService.GetCartBySupplier().subscribe((res:any)=>{
              this.cartItems=res.result.model;
              this.cartCrudService.storeBasketBySupplier(this.cartItems);
                        
            })
           
            this.toastr.success('محصول به سبد خرید اضافه شد');
            this.spinnerService.hide();
          }, (e) => {
            if (e.error.error.code === -2) {
              this.toastr.error(e.error.error.message);
              this.router.navigate(['/user-panel/my-store']);
            } else {
              this.toastr.error(e.error.error.message);
              this.spinnerService.hide();
            }
          }
        );

      } else {

        this.toastr.info('فروشگاه پیش فرض خود را انتخاب نکرده اید');
      }


    } else {
      this.isShowLogin = true;

    }

  }

  buyNow() {
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'smooth'
    });
  }

  buyNow1() {
    window.scrollTo({
      top: 1500,
      left: 0,
      behavior: 'smooth'
    });
  }

  checkAuth(item) {

    if (item.supplierPolicy.mandatoryNationalCode) {
      if (this.authService.isAuth) {
         this.termsAndConditions(item);
           } else {
              this.isShowLogin = true;
           }
    } 
    else {
      this.termsAndConditions(item);
    }
  }


  termsAndConditions(item: any) {
    this.route.params.subscribe(
      (params) => {
        this.id = params.id;
      }
    );
    this._item = item;
    const ref = this.modalService.open(TermsAndConditionsModaleComponent,
      {ariaLabelledBy: 'modal-basic-title', size: 'lg', keyboard: false, centered: true, scrollable: true}
    );

    ref.result.then((result) => {
    }, (reason) => {

    });
    ref.componentInstance.supplierItems = this._item;

  }

  closeAuth() {
    this.isShowLogin = false;
  }

  
}
