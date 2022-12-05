import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {CartCrudervice} from 'src/app/core/services/cart/cart.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {FactorCrudService} from '../../../core/services/factor/factor.service';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-select-company-store',
  templateUrl: './select-company-store.component.html',
  styleUrls: ['./select-company-store.component.scss']
})
export class SelectCompanyStoreComponent implements OnInit {
  stores: any[] = [];
  store: any;
  storeOutputDtosLength: any;
  defaultStoreId:any;
  defaultStore:any;
  @Output('sendStep') sendStep = new EventEmitter();
  currentUser:any;
  constructor(private authService: AuthService,
    private storeService: StoreService,
              private catCrudService: CartCrudervice,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private factorCrudService: FactorCrudService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getCurrentUser();
    this.getDefaultStoreId();
    this.getUserStores();
   
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
  createFactor() {
    if (this.defaultStoreId) {
      const data = {
        customerId: this.currentUser.id,
        storeId: Number(this.defaultStoreId)
      };
      // this.spinner.show();
      this.catCrudService.post('CartToFactor', data).subscribe(
        (res: any) => {
          console.log('CartToFactor',res);
          
          this.catCrudService.factors = res.result.model;
          this.router.navigate(['../factor/factor-list']);
          // this.spinner.hide();
        }, (e) => {
          if (e.error.error.code === -2) {
            this.toastr.error(e.error.error.message);
            this.router.navigate(['/user-panel/my-store']);
          } else if (e.error.error.code === -3) {
            this.toastr.error(e.error.error.message);
            this.router.navigate(['/user-panel/edit-profile']);
          } else {
            // this.spinner.hide();
            console.log(e);
            this.toastr.error(e.error.error.message);
          }
        }
      );
    } else {
      this.toastr.error('لطفا فروشگاه مورد نظر خود را انتخاب کنید');
    }

  }

  nextStep() {
    this.createFactor();


  }

  prevStep() {
    this.sendStep.emit('prev2');

  }

//   changeStore(event) {
//     this.store = event.target.value;
// this.authService.storeDefaultId(+(this.store))

// let params = new HttpParams();
// params = params.set('StoreId', +(this.store));
//     this.storeService.post('MakeDefaultStore', params).subscribe(
//       (data: any) => {
      
//         if(data.success){
//           this.authService.getProfile(this.currentUser.mobileNumber).subscribe((res:any)=>{
//             this.currentUser=res.result.model;
//             this.authService.storeUserInfo(res.result.model);
//           })

//           data.result.map(
//             (item) => {
//               if (item.authState === 'Active') {
//                 if (data.result.find(x => x.isDefault === true).id) {
                
//                   this.authService.storeDefaultId(data.result.find(x => x.isDefault === true).id);
        
//                   this.toastr.success('فروشگاه پیش فرض با موفقیت تغیر یافت')
//                 }
           
//               }
//             }
//           );
       
//         }
     
//         this.spinner.hide();
//       }, (err )=> {

//            this.spinner.hide();
//         this.toastr.error(err.error.error.message)
//       }
//     );
   
//   }

  getUserStores() {
    
    if (this.currentUser) {
      this.spinner.show();
      this.authService.getProfile(this.currentUser.mobileNumber).subscribe(
        (res: any) => {
          this.storeOutputDtosLength =
            res.result.model.storeOutputDtos.length;
          res.result.model.storeOutputDtos.map(
            (item) => {
              if (item.authState === 'Active') {
                this.stores = res.result.model.storeOutputDtos;
                this.defaultStore= res.result.model.storeOutputDtos.find(x => x.isDefault === true);
                console.log('defaultStore',this.defaultStore);
                
                this.authService.storeDefaultId( this.defaultStore.id);
              }
            }
          );
          this.spinner.hide();

        }, () => {
          this.spinner.hide();
        }
      );
    }
  }
  defaultStor(storeItem:any){
if(storeItem.id === this.defaultStoreId){
return true;

  }
}
}

