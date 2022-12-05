import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { orderCrudService } from 'src/app/core/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
 active=1;
 page=1;
 order1:any[]=[];
 order2:any[]=[];
 order3:any[]=[];
 order4:any[]=[];
 order5:any[]=[];
 order6:any[]=[];
 currentUser:any;
  constructor(private  orderCrudService:orderCrudService,
    private authService: AuthService,
    private spinner:NgxSpinnerService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllOrder1();
    this.getAllOrder2();
    this.getAllOrder3();
    this.getAllOrder4();
    this.getAllOrder5();
    this.getAllOrder6();
    window.scrollTo(0,0)

  
  }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  getAllOrder1(){
    this.spinner.show();

    let params=new HttpParams();
    params=params.set('customerId',this.currentUser.id).set('OrderState','1')
    this.orderCrudService.get('GetWithDetails',params).subscribe(
      (res:any)=>{
        this.order1=res.result.items;
    this.spinner.hide();

      }
    )
  }
  getAllOrder2(){
    this.spinner.show();
    
    let params=new HttpParams();
    params=params.set('customerId',this.currentUser.id).set('OrderState','2')
    this.orderCrudService.get('GetWithDetails',params).subscribe(
      (res:any)=>{
        this.order2=res.result.items;
        this.spinner.hide();
      }
    )
  }
  getAllOrder3(){
    this.spinner.show();
    
    let params=new HttpParams();
    params=params.set('customerId',this.currentUser.id).set('OrderState','3')
    this.orderCrudService.get('GetWithDetails',params).subscribe(
      (res:any)=>{
        this.order3=res.result.items;
        this.spinner.hide();
      }
    )
  }
  getAllOrder4(){
    this.spinner.show();
    
    let params=new HttpParams();
    params=params.set('customerId',this.currentUser.id).set('OrderState','5')
    this.orderCrudService.get('GetWithDetails',params).subscribe(
      (res:any)=>{
        this.order4=res.result.items;
        this.spinner.hide();
      }
    )
  }
  getAllOrder5(){
    this.spinner.show();
   
    let params=new HttpParams();
    params=params.set('customerId',this.currentUser.id).set('OrderState','5')
    this.orderCrudService.get('GetWithDetails',params).subscribe(
      (res:any)=>{
        this.order5=res.result.items;
        this.spinner.hide();
      }
    )
  }
  getAllOrder6(){
    this.spinner.show();
   
    let params=new HttpParams();
    params=params.set('customerId',this.currentUser.id).set('OrderState','6')
    this.orderCrudService.get('GetWithDetails',params).subscribe(
      (res:any)=>{
        this.order6=res.result.items;
        this.spinner.hide();
      }
    )
  }

  factorDetail(factorId,factorNumber){ 
    this.router.navigate(['/factor/factor-detail'],{ queryParams:{factorId:factorId,factorNumber:factorNumber,order:true}})
  }
}
