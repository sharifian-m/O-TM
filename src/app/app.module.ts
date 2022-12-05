import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainLayoutModule } from './layout/main/main-layout.module';
import { AboutusModule } from './modules/aboutus/aboutus.module';
import { HomeModule } from './modules/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth/auth.module';
import { CoreModule } from './core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CategoriesResolveGuard} from './core/guards/categories-resolve.guard';
import {ResolveTokenGuard} from './core/guards/resolve-token.guard';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MainLayoutModule,
    HomeModule,
    AboutusModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
    CoreModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgbModule,
    MatStepperModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),


  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  providers: [ResolveTokenGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
