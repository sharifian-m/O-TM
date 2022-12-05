import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingGuideComponent } from './shopping-guide/shopping-guide.component';

const routes: Routes = [
  {
    path:'',
    component:ShoppingGuideComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingGuideRoutingModule { }
