import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaComponent } from './meta/meta.component';

const routes: Routes = [
  {
    path: '',
    component: MetaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadAppRoutingModule { }
