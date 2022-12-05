import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListFilterComponent } from './product-list-filter/product-list-filter.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListFilterComponent
  },
  {
    path: 'product-info/:title',
    component: ProductListFilterComponent,
    data: { breadcrumb: {
      label: '',

    }
  }
  },
  {
    path: 'product-category/:catId',
    component: ProductListFilterComponent,
    data: { breadcrumb: {
      label: '',

    }
  }
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent
  },
  {
    path: 'product-detail/:id/:title',
    component: ProductDetailComponent,
    data: { breadcrumb: {
      label: '',

    }
  }



  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListFilterRoutingModule { }
