import {Component, ElementRef, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {CategoryService} from '../../../core/services/category/category.service';
import {Router} from '@angular/router';
import { HomePageService } from 'src/app/core/services/home/home.service';
import { ICategory } from 'src/app/models/category-interface';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ]),
    trigger('easeInOut', [
      transition('void => *', [
          style({
              opacity: 0
          }),
          animate("300ms ease-in", style({
              opacity: 1
          }))
      ]),
      transition('* => void', [
          style({
              opacity: 1
          }),
          animate("300ms ease-in", style({
              opacity: 0
          }))
        ])
      ])
  ]

})
export class NavComponent implements OnInit {
  isShowUser = false;
  isShowcooperate=false;
  content = 1;
  sticky = false;
  isShowMenu = false;
  menu: any;
  categories:ICategory[]=[];

  menuMobile = [
    {
      title: 'خانه',
      link: '/home'
    },
    {
      title: 'دسته بندی',
      link: '/'
    },
    {
      title: 'محصولات',
      link: '/product-list'
    },
    {
      title: 'برند ها',
      link: '/'
    },
    {
      title: 'خدمات',
      link: '/'

    },
    {
      title: 'قوانین و مقررات',
      link: '/rules'
    },
    {
      title: 'تماس با ما',
      link: '/contactus'
    },
    {
      title: 'درباره ما',
      link: '/aboutus'

    },

  ];
  foodItems: any;
  cosmeticItems: any;
  motherAndChildItems: any;
  cleaningItems: any;
  justInOTaminItems: any;
  otherItems: any;
  menuContent: any;
  megaMenuContent = 1;

  constructor(public authService: AuthService, private eRef: ElementRef, private cartCrudService: CartCrudervice,
              private categoryService: CategoryService,
              private homePageService :HomePageService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.homePageService.$homePageDataSubject.subscribe(res=>{
    this.categories = res.result.categoriesMenu;
       
    })
  
  
      }

    showContent(data) {
    this.content = data;
  }

  showMenuContent(data) {
    this.megaMenuContent = data;

  }

  goToCategoryDetail(id) {
    this.router.navigate(['/product-list/product-category', id]);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const scrollTop = $event.target.scrollingElement.scrollTop;
    if (scrollTop >= 20) {
      behavior: 'smooth'
      this.sticky = true;
    } else {
      this.sticky = false;
      behavior: 'smooth'

    }
  }

// @HostListener('window:click', ['$event'])
  hideMenu() {
    this.isShowMenu = false;
  }

// @HostListener('document:click', ['$event'])
// clickout(event) {
//   if(this.eRef.nativeElement.contains(event.target) && this.authService.isAuth) {
//    this.isShowUser=true
//   } else {
//     this.isShowUser=false
//   }
// }
  showMenu() {
    this.isShowMenu = !this.isShowMenu;
  
  }

  showHideUser() {
    this.isShowUser = !this.isShowUser;
  }
  
  showHideCooperate() {
    this.isShowcooperate = !this.isShowcooperate;
  }

  logout() {
    this.authService.logout();
    this.isShowUser = false;
    
  }
  toggleShowCooperate() {
    
    this.isShowcooperate = !this.isShowcooperate;
  }
 
}


