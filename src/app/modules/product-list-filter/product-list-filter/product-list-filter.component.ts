import {Options} from '@angular-slider/ngx-slider';
import {HttpParams} from '@angular/common/http';
// import {ThrowStmt} from '@angular/compiler';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {BrandCrudService} from 'src/app/core/services/brand-crud/brand.service';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {CategoryService} from 'src/app/core/services/category/category.service';
import {ItemCategoryService} from 'src/app/core/services/item-category/item-category.service';
import {ProductService} from 'src/app/core/services/product/product.service';
import {ShereCustomService} from 'src/app/core/services/share-custom/share-custom.service';
import {BreadcrumbService} from 'xng-breadcrumb';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {IBrands} from '../product-interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

class FilterSelected {
  id: any;
  name: string;
}

@Component({
  selector: 'app-product-list-filter',
  templateUrl: './product-list-filter.component.html',
  styleUrls: ['./product-list-filter.component.scss']
})

export class ProductListFilterComponent implements OnInit, AfterViewInit {
  public config: PerfectScrollbarConfigInterface = {};
  showDivBrands = true;
  showDivCategory = true;
  filterResult: FilterSelected[] = [];
  categoryItems: any[] = [];
  isLoad = false;
  failed = false;
  isShowSearch = false;
  q = 1;
  totalItems: number;
  categories: any[] = [];
  brands: IBrands[] = [];
  brandsByCategoryId = [];
  filterSelected: any[] = [];
  priceFrom: number;
  title: string;
  productName: string;
  priceTo: number;
  brandId: any;
  filter = false;
  hasSupplier = false;
  categoryId: number;
  options: Options = {
    floor: 1000,
    ceil: 10000000
  };
  unitList: any;
  highValue = 3000;
  value = 2000;
  routeBySearch = false;


  name = 'slideToggle';
  id = 'materialSlideToggle';
  checked = false;
  disabled = false;
  label = 'Toggle On/Off';
  labelledby = 'Some Other Text';
  brandCheckBox = false;
  currentUser:any;
  cartCount:any;
  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private cartCrudService: CartCrudervice,
              private spinnerService: NgxSpinnerService,
              private brandService: BrandCrudService,
              private ItemCategoryService: ItemCategoryService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private breadcrumbService: BreadcrumbService,
              private shereCustomService: ShereCustomService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    window.scrollTo(0, 0);
    this.getCategories();
    this.shereCustomService.get('GetUnitEnumForCombo').subscribe((res: any) => {
        this.unitList = res.result;
        console.log('this.unitList',this.unitList);
        
      }
    );
    this.route.params.subscribe( (data) => {
      if(data.title){
        this.title=data.title;
        if (this.router.url.search('product-info') !== -1) {
        
          this.routeBySearch = true;
          this.filterProductByTitle(this.title);
        }
      }
      else if(data.catId){
        this.categoryId =data.catId;
       if (this.router.url.search('product-list/product-category') !== -1) {
     
          this.routeBySearch = true;
          this.filterProductById(this.categoryId );
      
          
        }
      }
      else if (!this.title && !this.categoryId) {
        this.getAllProduct();
       
      }
    });
    this.getAllBrands();
    this.getItemCategory(); 
  }
  
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  ngAfterViewInit() {
    // this.breadcrumbService.breadcrumbs$.subscribe(
    //   (data) => {
    //     data[1].label = (this.title !== undefined &&  this.title !== null) ? this.title : 'محصولات';
    //   }
    // );
  }

  findUnitTitel(unitId) {
    return this.unitList.find(x => +x.value == unitId).displayText;
  }

  toggleCategories() {
    this.showDivCategory = !this.showDivCategory;
  }

  toggleBrands() {
    this.showDivBrands = !this.showDivBrands;
  }

  getItemCategory() {
    this.ItemCategoryService.get('GetAll').subscribe(
      (res:any) => {

      }
    );
  }


  getAllBrands() {
    let params = new HttpParams();
    params = params.set('maxResultCount', '10000');
    this.brandService.get('GetAll', params).subscribe(
      (res: any) => {
               
        this.brands = res.result.items.map(x => {
          return {
            title: x.title,
            id: x.id,
            isChecked: x.isChecked
          } as IBrands;
        });
      }
    );
    console.log('getAllBrands', this.brands);
    
  }

  getBrandsByCategoryId(item) {
    let params = new HttpParams();
    params = params.set('categoryId', this.categoryId?.toString());
    this.brandService.get('GetBrandsByCategoryId', params).subscribe(
      (res: any) => {
        console.log('GetBrandsByCategoryId',res);
        
        this.brands = res.result;
        item.isChecked = true;

      }
    );
  }

  getCategories() {
    this.categoryService.get('GetAll').subscribe(
      (res: any) => {
        this.categories = res.result.items;
        
      }
    );
  }
  changeCategory(item) {
      
    this.q = 1;

    this.brandsByCategoryId = [];
    this.categoryId = item.id;
    this.getBrandsByCategoryId(item);
    this.filterSelected.push({id: item.id, name: item.categoryTitle, type: 'category'});
   
    this.filterProductById(this.categoryId );
  }

  changeBrand(item) {
    
    const index = this.brandsByCategoryId.indexOf(item.id);
    if (index === -1) {
      this.brandsByCategoryId.push(item.id);
      this.filterProduct();
    } else {
      this.brandsByCategoryId.splice(index, 1);
      this.filterProduct();
    }
    // this.brandId = item.brandId;
    // this.brands.push(item.brandId);

  }

  changeFromPrice(event) {
    this.priceFrom = event;
    console.log('event',event);
    

  }

  changeToPrice(event) {
    this.priceTo = event;
  }

  // onChange(event) {
  //   this.hasSupplier = event;
  //   this.filterProduct();
  // }

  filterByTitle() {
    this.q = 1;
   this.title=this.productName;
   this.filterProductByTitle(this.title);
  }

  filterProductByTitle(title:any) {

    this.filter = true;
    this.spinnerService.show();
    const skipCount = 40 * (this.q - 1);
    const data = {
      title: title,
      // categoryId: this.categoryId,
      priceFrom: this.priceFrom,
      priceTo: this.priceTo,
      brands: this.brandsByCategoryId,
      maxResultCount: 40,
      hasSupplier: this.hasSupplier,
      skipCount: skipCount.toString(),
      customerId: this.currentUser.id ? this.currentUser.id : null

    };
    console.log('data filterProductByTitle ',data);
    let params: HttpParams = new HttpParams();
    for (const key in data) {
      if (data[key]) {
        params = params.set(key, data[key]);
      }
    }

    this.productService.get('GetSearch', params).subscribe(
      (res: any) => {
    
        this.isLoad = true;
        this.isShowSearch = false;
        this.filterResult = res.result.model.items;//ok
        this.totalItems = res.result.model.totalCount;
       
        this.spinnerService.hide();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, () => {
        this.spinnerService.hide();
      }
    );
  }
  filterProductById(id:any) {
  

    this.filter = true;
    this.spinnerService.show();
    const skipCount = 40 * (this.q - 1);
    const data = {
      // title: this.title,
      categoryId: id,
      priceFrom: this.priceFrom,
      priceTo: this.priceTo,
      brands: this.brandsByCategoryId,
      maxResultCount: 40,
      hasSupplier: this.hasSupplier,
      skipCount: skipCount.toString(),
      customerId: this.currentUser.id ? this.currentUser.id : null

    };
    console.log('filterProductById data',data);
    let params: HttpParams = new HttpParams();
    for (const key in data) {
      if (data[key]) {
        params = params.set(key, data[key]);
      }
    }


    this.productService.get('GetSearch', params).subscribe(
      (res: any) => {
        
        this.isLoad = true;
        this.isShowSearch = false;
        this.filterResult = res.result.model.items;//ok
        this.totalItems = res.result.model.totalCount;
       
        this.spinnerService.hide();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, () => {
        this.spinnerService.hide();
      }
    );
  }
  filterProduct() {
  
console.log('this.title',this.title);
console.log('this.categoryId',this.categoryId);
    this.filter = true;
    this.spinnerService.show();
    const skipCount = 40 * (this.q - 1);
    const data = {
      // title: this.title,
      // categoryId: this.categoryId,
      priceFrom: this.priceFrom,
      priceTo: this.priceTo,
      brands: this.brandsByCategoryId,
      maxResultCount: 40,
      hasSupplier: this.hasSupplier,
      skipCount: skipCount.toString(),
      customerId: this.currentUser.id ? this.currentUser.id : null

    };
    console.log('filterProduct data',data);
    
    let params: HttpParams = new HttpParams();
    for (const key in data) {
      if (data[key]) {
        params = params.set(key, data[key]);
      }
    }


    this.productService.get('GetSearch', params).subscribe(
      (res: any) => {
        
        this.isLoad = true;
        this.isShowSearch = false;
        this.filterResult = res.result.model.items;

        
        this.totalItems = res.result.model.totalCount;
       
        this.spinnerService.hide();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, () => {
        this.spinnerService.hide();
      }
    );
  }

  getAllProduct() {
    this.spinnerService.show();
    let params = new HttpParams();
    const skipCount = 40 * (this.q - 1);
    params = params.set('maxResultCount', '40').set('skipCount', skipCount.toString());
    this.productService.get('GetAll', params).subscribe(
      (res: any) => {
        this.filterResult = res.result.items;//ok
        console.log('this.filterResult',this.filterResult);
        
        this.totalItems = res.result.totalCount;
        this.spinnerService.hide();
        this.isLoad = true;

      }, () => {
        this.spinnerService.hide();
      }
    );
  }

  productDetail(id,title) {
    console.log('this.title', title);
    this.router.navigate(['/product-list/product-detail', {id:id ,title:title}]);
  

  }

  showSearchProduct() {
    this.isShowSearch = true;
  }

  closeSearch() {
    this.isShowSearch = false;

  }

  addToCart(item, event) {
    event.stopPropagation();
    if (this.cartCrudService.cartData.length == 0) {
      this.cartCrudService.cartData.push(item);
      this.cartCount++;
      this.toastr.success('محصول به سبد خرید اضافه شد');

    } else {
      const find = this.cartCrudService.cartData.find((data) => data.id == item.id);
      if (!find) {
        this.cartCount++;
        this.cartCrudService.cartData.push(item);
        this.toastr.success('محصول به سبد خرید اضافه شد');

      } else {
        this.toastr.error('محصول در سبد خرید موجود است');

      }

    }
    window.localStorage.setItem('basket', JSON.stringify(this.cartCrudService.cartData));
  }

  pageChanged(event) {
    this.q = event;
    console.log('q' ,this.q);
    
    if (!this.filter) {
      this.getAllProduct();
    } else {
      // this.filterProduct();
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  // resetFilter() {
  //   this.title = null,
  //     this.categoryId = null,
  //     this.priceFrom = null,
  //     this.priceTo = null,
  //     this.brandId = null;
  //   this.brandsByCategoryId = [];
  //   this.getAllProduct();
  //   this.filterSelected = [];
  // }

  // deleteFilterSelect(item) {
  //   if (item.type == 'brand') {
  //     this.brandId = undefined;
  //     this.filterSelected = this.filterSelected.filter(data => data.title != item.title);
  //     this.filterProduct();
  //   }
  //   if (item.type == 'category') {
  //     this.categoryId = undefined;
  //     this.filterSelected = this.filterSelected.filter(data => data.title != item.title);
  //     this.filterProduct();
  //   }

  // }
}