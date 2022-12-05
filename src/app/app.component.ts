import { HttpParams } from '@angular/common/http';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './core/services/auth/auth.service';
import { CartCrudervice } from './core/services/cart/cart.service';
import { LoaderService } from './core/services/loader/loader.service';
import {ToastrService} from 'ngx-toastr';
import { HomePageService } from './core/services/home/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  isLoading  = true;
  currentUser:any;
  storesInfo:any;
  defaultStoreId:any
  cartCount:number=0;
  buyBasket:any;
  constructor(private authService: AuthService,
              private cartCrudService: CartCrudervice,
              public  loaderService: LoaderService,
              private spinner: NgxSpinnerService,
              private toastrService: ToastrService,private homePageService: HomePageService,
    ){

  }
  title = 'otamin';


  ngOnInit(){
    this.getCurrentUser();
 
       if ( this.currentUser){
      this.authService.isAuth = true;
      this.getDefaultStoreId();    
    }
   
  }

  ngAfterViewInit() {
    this.isLoading = this.loaderService.isLoading;
  }


getCurrentUser(){
  this.authService.$currentUser.subscribe(res=>{
    this.currentUser=res;
    
  });

}

  
  getDefaultStoreId(){
   this.authService.$currentStoreDefaultId.subscribe(res=>{
    this.defaultStoreId=res
   });
}

}

