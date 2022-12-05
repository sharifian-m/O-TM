import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepresentationComponent } from './representation/representation.component';

const routes: Routes = [
  {
    path: '',
    component: RepresentationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepresentationRoutingModule { }
