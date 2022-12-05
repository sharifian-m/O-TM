import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {CustomerAddressService} from 'src/app/core/services/customer-address/customer-address.service';
import {ShereCustomService} from 'src/app/core/services/share-custom/share-custom.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  customerAddressGroup: UntypedFormGroup;
  isShowMap = false;
  provinces: any[] = [];
  regions: any[] = [];
  towns: any[] = [];
  latStore: number;
  langStore: number;
  currentUser:any;
  constructor(private fb: UntypedFormBuilder,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router,
              private customerAddressService: CustomerAddressService,
              private shereCustom: ShereCustomService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.initForm();
    this.getAllProvince();
    this.provinceChange();
    this.getAllRegion();
  }

  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  initForm() {
  
    this.customerAddressGroup = this.fb.group({
      postalCode: [''],
      homeTitle: ['', Validators.required],
      provinceId: ['', Validators.required],
      townShipId: ['', Validators.required],
      homePhone: [null],
      area: [null],
      mobileNumber: [null],
      customerId: [this.currentUser.id],
      unit: [null],
      address: [null],
      lat: [null],
      long: [null],
      zone: [null],
      plaque: [null],
      flowr: [null]
    });
  }

  getLocation(event) {
    this.isShowMap = event.isShow;
    this.customerAddressGroup.controls.lat.setValue(event.lat);
    this.customerAddressGroup.controls.lang.setValue(event.lng);
    this.latStore = event.lat;
    this.langStore = event.lng;

  }

  getAllRegion() {
    this.shereCustom.get('GetAllActivityZoneEnumForCombo').subscribe(
      (res: any) => {
        this.regions = res.result;
      }
    );
  }

  getAllProvince() {

    this.shereCustom.get('GetAllProvinceForCombo').subscribe(
      (res: any) => {
        this.provinces = res.result;
      }
    );
  }

  provinceChange() {
    this.customerAddressGroup.controls.provinceId.valueChanges.subscribe(
      (value) => {

        this.getAllTownByProvinceId(value);
      }
    );
  }

  checkSelectProvinceStore() {
    if (!this.customerAddressGroup.controls.provinceId.value) {
      this.toastr.error('لطفا استان مورد نظر خود را انتخاب کنید');
    }

  }

  getAllTownByProvinceId(id: any) {
    let params = new HttpParams();
    params = params.set('provinceId', id).set('maxResultCount', '10000');
    this.shereCustom.get('GetAllTownshipByProvinceIdForCombo', params).subscribe(
      (res: any) => {
        this.towns = res.result;
      }
    );
  }

  showHideMap() {
    this.isShowMap = !this.isShowMap;
  }

  addAddress() {
    this.customerAddressService.post('AddCustomerAddress', this.customerAddressGroup.value).subscribe(
      (data) => {
        this.toastr.success('آدرس جدید با موفقیت ثبت شد');
        this.router.navigate(['/user-panel/my-address']);

      }
    );
  }
}
