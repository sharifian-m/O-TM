import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CartCrudervice } from 'src/app/core/services/cart/cart.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { catchError, debounceTime } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { HttpParams } from '@angular/common/http';
import { CustomerAddressService } from 'src/app/core/services/customer-address/customer-address.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Children,
  Children2,
  ICategory,
} from '../../../models/category-interface';
import { HomePageService } from 'src/app/core/services/home/home.service';
import { ToastrService } from 'ngx-toastr';
import { ItemCategoryService } from 'src/app/core/services/item-category/item-category.service';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  phone: any = '02122360439';
  mobile: any = '09300017000';
  isShowMenu = false;
  form: UntypedFormGroup;
  isLevelOneMenu = false;
  sticky = false;
  isSearch = false;
  keyword: string;
  isStore = false;
  searchResult: any[] = [];
  categories: ICategory[] = [];
  storeAddress: any[] = [];
  userAddress: any[] = [];
  customerAddress: any[] = [];
  isShowUser = false;
  isClicked = false;
  id: any;
  menuMobile = [
    {
      title: 'دسته بندی',
      levels: [],
    },
    {
      title: 'محصولات',
      link: '/product-list',
      active: 'active',
    },
    {
      title: 'برند ها',
      link: '/brand',
      active: 'active',
    },
    {
      title: 'تامین کنندگان',
      link: '/supplier',
      active: 'active',
    },
    {
      title: 'راهنمای خرید',
      link: '/shopping-guide',
      active: 'active',
    },
    {
      title: 'قوانین و مقررات',
      link: '/rules',
      active: 'active',
    },
    {
      title: 'تماس با ما',
      link: '/contactus',
      active: 'active',
    },
    {
      title: 'درباره ما',
      link: '/aboutus',
      active: 'active',
    },
    {
      title: 'همکاری با ما',
      link: '/cooperateWithUs',
      active: 'active',
    },
    {
      title: 'استخدام',
      link: '/recruitment',
      active: 'active',
    },
    {
      title: 'سوالات متداول',
      link: '/faq',
      active: 'active',
    },
    {
      title: 'دانلود اپ',
      link: '/download-app',
      active: 'active',
    },
  ];
  isShowLocation = false;
  menu: any;
  megaMenuContent = 1;
  content = 1;
  levelTWoChildren: any;
  setBackgroundColor: string = 'white';
  cartCount: number=0;
  clicked = false;
  currentUser: any;
  defaultStoreId: any;
  cartItems: any = '';
  basketCountItems:number=0;
  constructor(
    public cartCrudService: CartCrudervice,
    private homePageService: HomePageService,
    public authService: AuthService,
    private storeService: StoreService,
    private productService: ProductService,
    private fb: UntypedFormBuilder,
    private categotyService: CategoryService,
    private customerAddressService: CustomerAddressService,
    private _eref: ElementRef,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getDefaultStoreId();
   
    this.getCurrentUser();

    this.getBuyBasket();


    this.getHomePageData();

    this.getCategoryMenu();

    this.getUserStores();

this.formInit();

    this.searchProduct();
  }

  formInit() {
    this.form = this.fb.group({
      search: [''],
    });
  }

  getHomePageData() {
    this.homePageService.$homePageDataSubject.subscribe((res) => {
      this.categories = res.result.categoriesMenu;
      
    });
  }

  getDefaultStoreId() {
    this.authService.$currentStoreDefaultId.subscribe(res=>{
      this.defaultStoreId=res
  });
}
  getBuyBasket() {

 if (this.defaultStoreId !== null && this.defaultStoreId !== undefined) {
 
  this.cartCrudService.$currentBasketBySupplier.subscribe(res=>{
    this.cartItems = res;
   });
   this.cartCrudService.storeBasketBySupplier(this.cartItems);
   this.countCartBysupplier();
}

else {
 this.toastr.info('جهت مشاهده تمامی قسمتها  لازم است ابتدا در سایت ثبت نام و سپس یک فروشگاه ایجاد کنید');
}

    }
 
  BuyBasketAfterChangeDefaultStore() {
    if (this.defaultStoreId !== null && this.defaultStoreId !== undefined) {

    this.cartCrudService.GetCartBySupplier().subscribe((res:any)=>{
    this.cartItems=res.result.model;
    console.log('this.buyBasket',res);
    this.cartCrudService.storeBasketBySupplier(this.cartItems);
    this.countCartBysupplier();
  })
   
     }
     
     else {
      this.toastr.info('جهت مشاهده تمامی قسمتها  لازم است ابتدا در سایت ثبت نام و سپس یک فروشگاه ایجاد کنید');
     }
         }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }

  countCartBysupplier() {
       this.cartCrudService.$currentBasketCount.subscribe(res=>{
       this.cartCount=res;
       
      });
  }

  ngOnChanges() {
    this.getCategoryMenu();
  }

  convertPersian(value) {
    value = Number(value);
    value = value.toLocaleString('fa-IR');
    return (value = value.replace(/\٬/g, ''));
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const scrollTop = $event.target.scrollingElement.scrollTop;
    if (scrollTop >= 200) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  goToCart() {
    this.router.navigate(['/cart/']);
  }

  showMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  hideMenu(item?: any) {
    if (item.levels) {
      this.isLevelOneMenu = !this.isLevelOneMenu;
    } else {
      this.isShowMenu = false;
    }
  }

  hideMenuFull() {
    this.isShowMenu = false;
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      // or some similar check
      this.isShowUser = false;
    }
  }

  showHideUser() {
    this.isShowUser = !this.isShowUser;
  }

  logout() {
    this.authService.logout();
    this.isShowUser = false;
  }

  goToPanel() {
    this.router.navigate(['/user-panel']);
  }

  searchProduct() {
    this.form.controls.search.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.isSearch = true;
        this.keyword = value;

        const params = new HttpParams()
          .set('Title', this.keyword)
          .set('SubTitle', this.keyword)
          .set('IsGrouped', 'false')
          .set('CustomerId', this.currentUser.id ? this.currentUser.id : null);

        this.productService.get('GetSearch', params).subscribe((res: any) => {
          this.searchResult = [...res.result.model.items];
        });
      });
  }

  showStoreLocation() {
    this.isShowLocation = !this.isShowLocation;
  }

  getUserStores() {
  
    if (
      this.currentUser.storeOutputDtos &&
      this.currentUser.storeOutputDtos != null
    ) {
      this.isStore = true;
      this.storeAddress = this.currentUser.storeOutputDtos;

      this.storeAddress.map((item) => {
        if (item.isDefault) {
          this.authService.storeDefaultId(item.id);
        }
      });
    } else {
      this.isStore = false;
      this.customerAddress = this.currentUser.customerAddresses;
    }
  }

  makeDefaultStoreAddress(storeId) {
    let params = new HttpParams();
    params = params.set('StoreId', storeId);
    this.spinner.show();
    this.storeService.post('MakeDefaultStore', params).subscribe(
      (data: any) => {
      
        if (data.success) {
        
          data.result.map((item) => {
            if (item.authState === 'Active') {
              if (data.result.find((x) => x.isDefault === true).id) {
                this.authService.storeDefaultId(
                  data.result.find((x) => x.isDefault === true).id
                );
                this.currentUser =  {...this.currentUser,storeOutputDtos:data.result}
                this.authService.storeUserInfo(this.currentUser);
                this.toastr.success('فروشگاه پیش فرض با موفقیت تغیر یافت');
                this.BuyBasketAfterChangeDefaultStore();
              }
            }
          });
          
        }

        this.showStoreLocation();
this.router.navigate(['/']);
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error.message);
      }
    );
  }

  makeDefaultAddress(addressId) {
    let params = new HttpParams();
    params = params.set('AddressId', addressId);
    this.spinner.show();
    this.customerAddressService.post('MakeDefaultAddress', params).subscribe(
      (data) => {
        this.authService.addressId = addressId;

        this.getUserStores();
        window.localStorage.setItem('addressId', this.authService.addressId);
        this.authService.storeId = '';
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  setColorDeafult(store: any) {
    const storeId = this.defaultStoreId;
    if (store.id === storeId) {
      return 'red';
    } else {
      return 'white';
    }
  }

  goToProduct() {
    this.router.navigate([
      '/product-list/product-info',
      this.form.controls.search.value,
    ]);
    this.isSearch = false;
  }

  getCategoryMenu() {
    let category: ICategory[];

    category = this.categories;

    category = category?.map((ca: ICategory) => {
      return {
        ...ca,
        isLevelOne: false,
        children: ca.children.map((l2: Children) => {
          return {
            ...l2,
            isLevelTwo: false,
            children: l2.children.map((l3: Children2) => {
              return {
                ...l3,
                isLevelThree: false,
              };
            }),
          };
        }),
      };
    });
    this.menuMobile[0].levels = category;
  }

  goToCategoryDetail(id) {
    this.router.navigate(['/product-list/product-category', id]);
    this.isShowMenu = false;
  }
}
