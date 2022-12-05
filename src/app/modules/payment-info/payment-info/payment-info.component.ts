import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { CartCrudervice } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  fullName:string;
  isSuccess:boolean=false;
  currentRoute:string;
  amount:number;
  cartCount:any;
  constructor(private router:Router,private route: ActivatedRoute,private cartCrudService:CartCrudervice) { 
    this.route.queryParams.subscribe(
      (params)=>{
        this.amount=params.amount;
        if(params.status=='success'){
          this.isSuccess=true
        }else{
          this.isSuccess=false
        }
        window.localStorage.removeItem('basket');
        this.cartCrudService.storeBasketBySupplier([]);
      }
    )
}
  

  ngOnInit(): void {
   let usernfo=JSON.parse(window.localStorage.getItem('currentUser'));
   this.fullName=usernfo.firstName+ " "+ usernfo.lastName;
  }
  getNumberWithComma(value){
    value=String(value);
    return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     
  }
  goToOrder(){
    this.router.navigate(['/order'])
  }
}
