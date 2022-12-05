import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error4Component} from './error4/error4.component';
import {ErrorsComponent} from './errors.component';

const routes: Routes = [

  {
    path: '',
    component: ErrorsComponent,
    children: [

      {
        path: 'error-4',
        component: Error4Component,
      },

      {path: '', redirectTo: 'error-1', pathMatch: 'full'},
      {
        path: '**',
        component: Error4Component,
        pathMatch: 'full',
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {
}
