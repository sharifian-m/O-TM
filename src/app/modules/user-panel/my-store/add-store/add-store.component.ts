import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {RegistrationService} from 'src/app/core/services/registeration/registration.service';
import {ShereCustomService} from 'src/app/core/services/share-custom/share-custom.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {
  isShowArea = true;
  isShowMap = true;
  isStore: number = null;
  mobileNumber: any;
  latStore: number;
  langStore: number;
  latFactory: number;
  nationalCardFrontImage: string;
  nationalCardBehindImage: string;
  uploadStoreDocumentName: string;
  uploadBusinessLicenseName: string;
  uploadWarrantyLicenseFileName: string;
  uploadHealthLicenseFileName: string;
  uploadOperationLicenseFileName: string;
  uploadStandardBadgeFileName: string;
  uploadLogoFileName: string;
  provinces: any[] = [];
  consumerTypes: any[] = [];
  regions: any[] = [];
  currentUser:any;
  towns: any[] = [];
  userTypes: any[] = [
    {
      label: 'سوپر مارکت',
      value: 0
    },
    {
      label: 'هایپر مارکت',
      value: 1
    },
    {
      label: 'فروشگاه زنجیره ای',
      value: 2
    },
    {
      label: 'هتل',
      value: 3
    },
    {
      label: 'رستوران',
      value: 4
    },
    {
      label: 'کافی شاپ',
      value: 5
    },
    {
      label: 'تالار',
      value: 6
    },
    {
      label: 'مجموعه ورزشی',
      value: 7
    },
    {
      label: 'آشپز خانه و کترینگ',
      value: 8
    },
    {
      label: 'بیمارستان',
      value: 9
    },
    {
      label: 'سالن همایش',
      value: 10
    },
    {
      label: 'مجموعه تفریحی',
      value: 11
    },
    {
      label: 'تعاونی',
      value: 12
    },
    {
      label: 'شخصی',
      value: 13
    },
    {
      label: 'سازمان/ارگان',
      value: 14
    },
  ];
  factoryTypes: any[] = [
    {
      label: 'مواد غذایی',
      value: 0
    },
    {
      label: 'شوینده',
      value: 1
    },
    {
      label: 'آرایشی و بهداشتی',
      value: 2
    },
    {
      label: 'سلولزی',
      value: 3
    },
    {
      label: 'شرکت پخش',
      value: 4
    },
  ];
  userTypeActivity: string = 'سوپر مارکت';
  storeGroup: UntypedFormGroup;
  nationalCardFrontImageSrc = null;
  nationalCardBehindImageSrc = null;
  businessLicenseImageSrc = null;
  storeDocumentImageSrc = null;

  constructor(private fb: UntypedFormBuilder,
              private registerService: RegistrationService,
              private toastr: ToastrService,
              private router: Router,
              private shereCustom: ShereCustomService,
              private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.storeInitForm();
    this.getAllProvince();
    this.provinceChange();
    this.getAllConsumerTypes();
    this.getAllRegion();
  }

  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  storeInitForm() {
    this.storeGroup = this.fb.group({
      postalCode: ['', Validators.required],
      storeTitle: ['', Validators.required],
      storeDescription: [''],
      provinceId: ['', Validators.required],
      townShipId: ['', Validators.required],
      businessLicenseOfficialNewspaper: [null],
      storePhoneNumber: [null, Validators.required],
      storeAddress: [null, Validators.required],
      uploadNationalCardFrontImage: [null],
      uploadNationalCardBehindImage: [null],
      uploadStoreDocument: [null],
      uploadBusinessLicense: [null],
      lease: [null],
      storeArea: [null],
      consumerType: ['0'],
      lat: [null],
      lang: [null],
      zone: [null,Validators.required]

    });

  }

  registerStore() {
  

    const data = {
      customerUniqIndentifier: this.currentUser.uniqIndentifier,
      ...this.storeGroup.value

    };
    const formData = new FormData();
    for (var key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
    if (this.storeGroup.valid) {
      this.registerService.post('RegisterStore', formData).subscribe(
        (res) => {
         
          console.log('RegisterStore',res);
          
          this.authService.getProfile(this.currentUser.mobileNumber).subscribe(
            (res: any) => {
             
              
              this.authService.storeUserInfo(res.result.model);  
            
              this.toastr.success('فروشگاه شما با موفقیت ثبت شد');
              this.router.navigate(['/user-panel/my-store']);
                 
            });
                 
        }, error => {

        }
      );
    } else {
      this.toastr.error('پر کردن فیلد های ستاره دار ضروری است');
    }
  }
  getAllRegion() {
    this.shereCustom.get('GetAllActivityZoneEnumForCombo').subscribe(
      (res: any) => {
        this.regions = res.result;
      }
    );
  }
  getAllConsumerTypes() {
    this.shereCustom.get('GetAllConsumerTypesEnumForCombo').subscribe(
      (res: any) => {
        this.consumerTypes = res.result;

      }
    );
  }

  getLocation(event) {
    this.isShowMap = event.isShow;
    this.storeGroup.controls.lat.setValue(event.lat);
    this.storeGroup.controls.lang.setValue(event.lng);
    this.latStore = event.lat;
    console.log('this.latStore',this.latStore);
    
    this.langStore = event.lng;
    console.log('this.langStore',this.langStore);

  }

  getAllProvince() {

    this.shereCustom.get('GetAllProvinceForCombo').subscribe(
      (res: any) => {
        this.provinces = res.result;
      }
    );
  }

  provinceChange() {
    this.storeGroup.controls.provinceId.valueChanges.subscribe(
      (value) => {

        this.getAllTownByProvinceId(value);
      }
    );
  }

  checkSelectProvinceStore() {
    if (!this.storeGroup.controls.provinceId.value) {
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

  onFileUploadNationalCardFrontImageSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.nationalCardFrontImageSrc = reader.result as string;
          this.nationalCardFrontImage = file.name;
          this.storeGroup.controls.uploadNationalCardFrontImage.setValue(file);

        };
      }else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');
      }

    }
  }

  onFilUploadNationalCardBehindImageSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.nationalCardBehindImageSrc = reader.result as string;
          this.nationalCardBehindImage = file.name;
          this.storeGroup.controls.uploadNationalCardBehindImage.setValue(file);
        };
      }else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onFilUploadUploadStoreDocumentSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.storeDocumentImageSrc = reader.result as string;
          this.uploadStoreDocumentName = file.name;
          this.storeGroup.controls.uploadStoreDocument.setValue(file);

        };
      }else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onFilUploadUploaduploadBusinessLicenseSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.businessLicenseImageSrc = reader.result as string;
          this.uploadBusinessLicenseName = file.name;
          this.storeGroup.controls.uploadBusinessLicense.setValue(file);
        };
      }else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');


      }

    }
  }

}
