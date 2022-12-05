import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CustomerAddressService} from 'src/app/core/services/customer-address/customer-address.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {StoreInformationComponent} from '../my-store/store-information/store-information.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.scss']
})
export class MyAddressComponent implements OnInit {
  customerAddress: any[] = [];
  currentUser:any;
  constructor(private router: Router, private customerAddressService: CustomerAddressService,
              private spinner: NgxSpinnerService, private modalService: NgbModal,
              private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllCustomerAddress();
  }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }

  goToAddAddress() {
    this.router.navigate(['/user-panel/add-address']);
  }

  getAllCustomerAddress() {
    this.spinner.show();
    
    let param = new HttpParams();
    param = param.set('customerId', this.currentUser.id);
    this.customerAddressService.get('GetAllCustomerAddress', param).subscribe(
      (res: any) => {
        this.customerAddress = res.result.items;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
  }

  mapShow(item) {
    const ref = this.modalService.open(StoreInformationComponent, { size : 'lg', scrollable: true });
    ref.componentInstance.type = 'map';
    ref.componentInstance.lat = item.lat;
    ref.componentInstance.lng = item.lang;
  }
}
