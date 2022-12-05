import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SupplierListComponent} from './supplier-list/supplier-list.component';
import {BrandDetailComponent} from '../brand/brand-detail/brand-detail.component';
import {SupplierDetailComponent} from './supplier-detail/supplier-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierListComponent
  },
  {
    path: 'supplier-detail',
    component: SupplierDetailComponent,

  },
  {
    path: 'supplier-detail/:id',
    component: SupplierDetailComponent,
    data: {
      breadcrumb: {
        label: '',

      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule {
}
