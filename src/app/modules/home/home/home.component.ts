import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BrandCrudService } from 'src/app/core/services/brand-crud/brand.service';
import { CartCrudervice } from 'src/app/core/services/cart/cart.service';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { HomePageService } from 'src/app/core/services/home/home.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { SliderService } from 'src/app/core/services/slider/slider.service';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Pagination } from 'swiper/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Brand, CategoriesMenu, MainCategory, Slider ,Product} from 'src/app/models/home-page-Get';
import {map} from 'rxjs/internal/operators';
import {interval, Observable} from 'rxjs';
import { CountdownComponent } from 'ngx-countdown';
import * as moment from 'moment';
// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('cd', {static: false}) private countdown: CountdownComponent;
  tokenInfo:any;
  countDownConfig:any; 
  index = 0;
  timer: any;
  showDiscountInfo:boolean=true;
  resetTimer = false;
  showCounter:boolean=false;
  remainingDay:boolean=false;
  remainingSecond:any=0;
  bestSellingItem: any[] = [];
  mostDiscountItem: Product[] = [];
  newProductItem: any[] = [];
  mostDiscounted: any[] = [];
  categoryItemFood: any[] = [];
  categoryItemcostemic: any[] = [];
  slider: Slider[]=[];
  brands: Brand[] = [];
  firstRowBrands: any[] = [];
  secondRowBrands: any[] = [];
  mainCategories:MainCategory[]=[];
  awsomeOffer: Product[] = [];
  cartCount:any;
  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,

    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    autoplay: true,
    loop: true,
    speed: 500,
    grabCursor: true,


  };
  configCategoty: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 0,
    autoplay: true,
    loop: true,
    speed: 500,
    grabCursor: true,
    slidesPerView: 5,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 5,
        spaceBetween: 30
      }
    }

  };

  brandConfig: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    autoplay: true,
    slidesPerView: 5,
    loop: true,
    speed: 500,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 5,
        spaceBetween: 30
      }
    }

  };
  offerCategoty: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween:10,
    autoplay: false,
    loop: false,
    speed:250,
    grabCursor: true,
    slidesPerView:2,
    breakpoints: {
     // when window width is >= 768px
    768: {
        slidesPerView: 3,
        spaceBetween:2
      },
  
        // when window width is >= 1200px
      1200: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      // when window width is >= 1440px
      1441: {
        slidesPerView:6,
        spaceBetween: 5
      },
        
    }
  };
  newProduct: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 20,
    autoplay: true,
    loop: true,
    speed: 500,
    grabCursor: true,
    slidesPerView: 5,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 5
      }
    }
  };
  bestSellingProduct: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 20,

    autoplay: true,

    loop: true,
    speed: 500,
    grabCursor: true,
    slidesPerView: 5,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 5
      }
    }
  };
  categoryItem: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 20,
    autoplay: true,
    loop: true,
    centeredSlides:true,
    speed: 500,
    grabCursor: true,
    slidesPerView: 4,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 10
      }
    }
  };

  constructor(private categotyService: CategoryService,
    private brandCrudService: BrandCrudService,
    private homePageService: HomePageService,
    private cartCrudService: CartCrudervice,
    private productService: ProductService,
    private toastr: ToastrService,
    private sliderService: SliderService,
    private router: Router,
    private authService: AuthService,
    private spinnerService: NgxSpinnerService,
  
  ) {
  
  }

  
  ngOnInit(): void {
    
  
      window.scrollTo(0, 0);
    
    this.getHomeItems();
  }

  getHomeItems(): void {

    this.spinnerService.show();
    this.homePageService.getHomeItems().subscribe(
      (res: any) => {
        console.log('home', res);
        
        this.homePageService.setHomePageData(res);
        
        this.slider = res.result.slider;
      
        this.brands = res.result.brands;

   
        
        const half = Math.ceil(this.brands.length / 2);
               this.firstRowBrands = this.brands.splice(0, half);
             this.secondRowBrands = this.brands.splice(-half);
      
        // this.brands = [...this.firstRowBrands, ...this.secondRowBrands];
        this.awsomeOffer = res.result.contents[2].products;
        
        
      
this.mainCategories=res.result.mainCategories;

       this.mostDiscountItem = res.result.contents[0].products;
        this.bestSellingItem = res.result.contents[1].products;
        this.spinnerService.hide();

    //   }, () => {
    //     this.toastr.error('خطا در دریافت اطلاعات');
    //     this.spinnerService.hide();
      }
    );


  }

  
  

  goToBrand(item) {
    if (item.brandId != null) {
      this.router.navigate(['/brand/brand-detail', item.brandId]);
    }
  }


  productDetail(id,title) {
    this.router.navigate(['product-list/product-detail', {id,title}]);
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

  
  brandDetail(id: any) {
    this.router.navigate(['/brand/brand-detail', id]);
  }

  getProductCategory(item) {
    this.router.navigate(['/product-list/product-category', item.id]);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  Remainingtime(discountEndDate){
 
   let now = moment().format().slice(0,19); 
  
   let milisecondDiff=Date.parse(discountEndDate)-Date.parse(now);
   let days: any;
   days = this.getDays(milisecondDiff);

if (days>=1){
 
  this.remainingDay=true;
  this.showDiscountInfo=true;
  this.showCounter=false;
  return  days;
} 

else if(days===0){
 
  this.showCounter=true;
  this.remainingDay=false;
  this.showDiscountInfo=true;
  this.remainingSecond= (milisecondDiff/1000);
  this.countdown?.begin();
 
}
else if(days<0){
  this.showDiscountInfo=false;
  this.remainingDay=false;
  this.showCounter=false;
}
  }
   
getDays(milisecondDiff) {
  let day=Math.floor( milisecondDiff / (1000 * 60 * 60 * 24) );
  return day;
}

}


