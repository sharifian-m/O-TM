import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CooperateWithUsComponent} from './cooperate-with-us/cooperate-with-us.component';

const routes: Routes = [
  {
    path: '',
    component:  CooperateWithUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CooperateWithUsRoutingModule { }
