import {HttpParams} from '@angular/common/http';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {BrandCrudService} from 'src/app/core/services/brand-crud/brand.service';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {GeneralService} from 'src/app/core/services/general/general.service';
import {HomePageService} from 'src/app/core/services/home/home.service';
import {SwiperOptions} from 'swiper';
import {BreadcrumbService} from 'xng-breadcrumb';
import {ProductService} from '../../../core/services/product/product.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.scss']
})
export class BrandDetailComponent implements OnInit, AfterViewInit {
  model: any;
  brandInfo: any;
  imageBaseUrl = 'https://api.otamin.ir/';
  bestSellingItem: any[] = [];
  id: string;
  cartCount:any;
  routeId = 'brand';
  newProduct: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 20,
    autoplay: true,
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
  totalItems: number;
  q = 1;

  constructor(private homePageService: HomePageService,
              private brandCrudService: BrandCrudService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private cartCrudService: CartCrudervice,
              private toastr: ToastrService,
              private breadcrumbService: BreadcrumbService,
              public generalService: GeneralService,
              private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {

    window.scrollTo(0, 0);
    // this.generalService.isLoadData = false;
    this.route.params.subscribe(
      (params) => {
        this.id = params.id;
        this.getItems();
        this.getBrandInfo();

      }
    );


  }

  ngAfterViewInit() {
    // if (this.model){
    //   this.breadcrumbService.breadcrumbs$.subscribe(
    //     (data) => {
    //       this.generalService.isLoadData = true;
    //       data[1].label = this.model ? this.model.title : '';
    //       this.generalService.isLoadData = true;
    //     }
    //   );
    // }
  }

  getBestSellingItems() {
    this.spinner.show();
    this.homePageService.post('BestSellingItems', {}).subscribe(
      (res: any) => {
        this.bestSellingItem = res.result.model;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();


      }
    );
  }

  productDetail(id) {
    this.router.navigate(['product-list/product-detail', id]);
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



  getBrandInfo() {
    let params = new HttpParams();
    params = params.set('Id', this.route.snapshot.params.id);
    this.brandCrudService.get('Get', params).subscribe((res: any) => {
      this.brandInfo = res.result;
    });
  }

  getItems() {

    this.spinner.show();
    let params = new HttpParams();
    const skipCount = 16 * (this.q - 1);
    params = params.set('BrandId', this.route.snapshot.params.id).set('maxResultCount', '16').set('skipCount', skipCount.toString());
    this.productService.get('GetAll', params).subscribe(
      (res: any) => {
        this.model = res.result;

        this.bestSellingItem = res.result.items;
        this.totalItems = res.result.totalCount;
        this.routeId = this.id;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();

        if (this.routeId !== 'brand') {
          this.router.navigate(['brand/brand-detail', this.routeId]);
        } else {
          this.router.navigate(['brand']);
        }
      }
    );

  }


  pageChanged(event) {
    this.q = event;
    this.getItems();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
