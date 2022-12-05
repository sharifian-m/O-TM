import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {FactorUnpaidComponent} from './factor-unpaid/factor-unpaid.component';
import {AddAddressComponent} from './my-address/add-address/add-address.component';
import {MyAddressComponent} from './my-address/my-address.component';
import {AddStoreComponent} from './my-store/add-store/add-store.component';
import {MyStoreComponent} from './my-store/my-store.component';
import {OrderDetailComponent} from './order-list/order-detail/order-detail.component';
import {OrderListComponent} from './order-list/order-list.component';
import {UserPanelComponent} from './user-panel/user-panel.component';
import {FactorDetailComponent} from './factor-unpaid/factor-detail/factor-detail.component';

const routes: Routes = [
 
  {
    path: '',
    component: UserPanelComponent,
    data: {
      breadcrumb: {
        label: 'پنل کاربری',

      }
    },
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          breadcrumb: {
            label: 'داشبورد',

          }
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: {
            label: 'داشبورد',

          }
        }
      },
      {
        path: 'my-store',
        component: MyStoreComponent,
        data: {
          breadcrumb: {
            label: 'فروشگاه های من',


          }
        },

      },
      {
        path: 'my-address',
        component: MyAddressComponent,
        data: {
          breadcrumb: {
            label: 'ادرس های من ',


          }
        },

      },
      {
        path: 'add-store',
        component: AddStoreComponent,
        data: {
          breadcrumb: {
            label: 'ثبت فروشگاه جدید',

          }
        }
      },
      {
        path: 'add-address',
        component: AddAddressComponent,
        data: {
          breadcrumb: {
            label: 'ثبت آدرس جدید  ',

          }
        }
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        data: {
          breadcrumb: {
            label: 'ویرایش پروفایل',

          }
        }

      },
      {
        path: 'factor-unpaid',
        component: FactorUnpaidComponent,
        data: {
          breadcrumb: {
            label: 'فاکتور های پرداخت نشده',

          }
        }

      },   {
        path: 'factor-detail',
        component: FactorDetailComponent,
        data: {
          breadcrumb: {
            label: ' جزییات فاکتور ',

          }
        }

      },
      {
        path: 'order-list',
        component: OrderListComponent,
        data: {
          breadcrumb: {
            label: 'سفارشات',

          }
        }

      },
      {
        path: 'order-detail',
        component: OrderDetailComponent,
        data: {
          breadcrumb: {
            label: 'جزئیات سفارش',

          }
        }

      },
      // {
      //   path: '',
      //   redirectTo: 'dashboard'
      // },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPanelRoutingModule {
}
