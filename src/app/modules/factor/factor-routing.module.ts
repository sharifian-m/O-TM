import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactorDetailComponent } from './factor-detail/factor-detail.component';
import { FactorListComponent } from './factor-list/factor-list.component';
import { FactorComponent } from './factor/factor.component';

const routes: Routes = [
  {
    path:'',
    component:FactorComponent
  },
  {
    path:'factor-detail',
    component:FactorDetailComponent
  },
  {
    path:'factor-list',
    component:FactorListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorRoutingModule { }
