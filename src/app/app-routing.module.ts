import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {CategoriesResolveGuard} from './core/guards/categories-resolve.guard';


let routes: Routes;
routes = [
  {

    path: 'home',
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    data: {
      breadcrumb: {
        label: 'صفحه اصلی'
      },
    }

  },
  {
    path: 'aboutus',

    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/aboutus/aboutus.module').then(m => m.AboutusModule),
    data: {
      breadcrumb: {
        label: 'درباره ما'
      }
    }
  },
  {
    path: 'rules',

    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/rules/rules.module').then(m => m.RulesModule),
    data: {
      breadcrumb: {
        label: 'قوانین و مقررات'
      }
    }
  },

  {
    path: 'privacy',

    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/privacy/privacy.module').then(m => m.PrivacyModule),
    data: {
      breadcrumb: {
        label: 'حریم خصوصی'
      }
    }
  },
  {
    path: 'contactus',

    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/contactus/contactus.module').then(m => m.ContactusModule),
    data: {
      breadcrumb: {
        label: 'تماس با ما'
      }
    }

  },
  {
    path: 'cooperateWithUs',
    resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/cooperate-with-us/cooperate-with-us.module').then(m => m.CooperateWithUsModule),
    data: {
      breadcrumb: {
        label: 'همکاری با ما'
      }
    }

  },
  {
    path: 'representation',

    loadChildren: () => import('./modules/representation/representation.module').then(m => m.RepresentationModule),
    data: {
      breadcrumb: {
        label: 'اخذ  نمایندگی'
      }
    }

  },
  {
    path: 'recruitment',

    resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/recruitment/recruitment.module').then(m => m.RecruitmentModule),
    data: {
      breadcrumb: {
        label: 'استخدام'
      }
    }

  },
  {
    path: 'shopping-guide',

    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/shopping-guide/shopping-guide.module').then(m => m.ShoppingGuideModule),
    data: {
      breadcrumb: {
        label: 'راهنمای خرید'
      }
    }
  },
  {
    path: 'product-list',
    canActivate: [AuthGuard],
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/product-list-filter/product-list-filter.module').then(m => m.ProductListFilterModule),
    data: {
      breadcrumb: {
        label: 'محصولات'
      }
    }
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule),
    data: {
      breadcrumb: {
        label: 'سبد خرید'
      }
    }
  },
  {
    path: 'factor',
    canActivate: [AuthGuard],
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/factor/factor.module').then(m => m.FactorModule),
    data: {
      breadcrumb: {
        label: 'فاکتور'
      }
    }
  },
  {
    path: 'order',
    canActivate: [AuthGuard],
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
    data: {
      breadcrumb: {
        label: 'سفارش'
      }
    }
  },
  {
    path: 'payment-info',
    canActivate: [AuthGuard],
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/payment-info/payment-info.module').then(m => m.PaymentInfoModule),
    data: {
      breadcrumb: {
        label: 'جزئیات پرداخت'
      }
    }
  },
  {
    path: 'auth',
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./auth/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'faq',

    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/faq/faq.module').then(m => m.FaqModule),
    data: {
      breadcrumb: {
        label: 'سوالات متداول'
      }
    }
  },
  {
    path: 'brand',
    canActivate: [AuthGuard],
    // resolve: {categories: CategoriesResolveGuard},
    resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/brand/brand.module').then(m => m.BrandModule),
    data: {
      breadcrumb: {
        label: 'برندها'
      }
    }

  },
  {
    path: 'supplier',
    canActivate: [AuthGuard],
    resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/supplier/supplier.module').then(m => m.SupplierModule),
    data: {
      breadcrumb: {
        label: 'تامین کنندگان'
      }
    }

  },
  {
    path: 'download-app',
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/download-app/download-app.module').then(m => m.DownloadAppModule),
    data: {
      breadcrumb: {
        label: 'دانلود ها '
      }
    }

  }, {
    path: 'metaverse',
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/meta/meta-module').then(m => m.MetaModule),
    data: {
      breadcrumb: {
        label: 'metaverse'
      }
    }

  },
  {
    path: 'user-panel',
    canActivate: [AuthGuard],
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () => import('./modules/user-panel/user-panel.module').then(m => m.UserPanelModule)
  },

  {
    path: 'main',
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () =>
      import('../app/layout/main/main-layout.module').then((m) => m.MainLayoutModule),
  },
  {
    path: 'error',
    resolve: {categories: CategoriesResolveGuard},
    // resolve: {categories: CategoriesResolveGuard},
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },

  {path: '**', redirectTo: 'error/404'},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
