import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';
import { BrandListComponent } from './brand-list/brand-list.component';

const routes: Routes = [
  {
    path: '',
    component: BrandListComponent
  },
  {
    path: 'brand-detail',
    component: BrandDetailComponent,

  },
  {
    path: 'brand-detail/:id',
    component: BrandDetailComponent,
    data: { breadcrumb: {
      label: '',

    }
  }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
