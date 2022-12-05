import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {FactoryService} from 'src/app/core/services/factory/factory.service';
import {RegistrationService} from 'src/app/core/services/registeration/registration.service';
import {StoreService} from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  nationalCodeImageUrl: string;
  isShowArea = true;
  qr: string;
  isFainalNationalCode = false;
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
      value: 1
    },
    {
      label: 'شوینده',
      value: 2
    },
    {
      label: 'آرایشی و بهداشتی',
      value: 3
    },
    {
      label: 'سلولزی',
      value: 4
    },

  ];
  userTypeActivity = 'سوپر مارکت';
  customerInfoGroup: UntypedFormGroup;
  storeGroup: UntypedFormGroup;
  formData: any;
  factoryeGroup: UntypedFormGroup;
  isShowMap = false;
  isStore = 0;
  mobileNumber: any;
  latStore: number;
  langStore: number;
  latFactory: number;
  langFactory: number;
  verificationCode: any;
  nationalCardFrontImage: string;
  nationalCardBehindImage: string;
  uploadStoreDocumentName: string;
  uploadBusinessLicenseName: string;
  uploadWarrantyLicenseFileName: string;
  uploadHealthLicenseFileName: string;
  uploadOperationLicenseFileName: string;
  uploadStandardBadgeFileName: string;
  uploadLogoFileName: string;
  loading = false;
  currentUser:any;
  constructor(private fb: UntypedFormBuilder,
              private authService: AuthService,
              private factoyService: FactoryService,
              private storeService: StoreService,
              private spinnerService: NgxSpinnerService,
              private registerService: RegistrationService,
              private toastr: ToastrService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    window.scrollTo(0, 0);
    this.customerInfoInitForm();
    this.getProfile();
    this.getPreRegisterData();
    this.storeInitForm();
    this.factoyInitForm();
    this.storeFieldChange();


  }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  customerInfoInitForm() {
    this.customerInfoGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      isLegal: [null, Validators.required],
      address: [null],
      nationalCode: [''],
      roleCode: [''],
      nationalCodeImageUrl: ['']


    });


  }

  storeInitForm() {
    this.storeGroup = this.fb.group({
      postalCode: [''],
      storeTitle: ['', Validators.required],
      storeDescription: [''],
      businessLicenseOfficialNewspaper: [null, Validators.required],
      storePhoneNumber: [null, Validators.required],
      storeAddress: [null, Validators.required],
      uploadNationalCardFrontImage: [null],
      uploadNationalCardBehindImage: [null],
      uploadStoreDocument: [null, Validators.required],
      uploadBusinessLicense: [null],
      lease: [null],
      storeArea: [null],
      consumerType: [0],
      lat: [null],
      lang: [null],
      zone: [null]

    });

  }

  factoyInitForm() {
    this.factoryeGroup = this.fb.group({
      postalCode: [''],
      factoryTitle: ['', Validators.required],
      factoryDescription: ['',],
      phoneNumber: [null, Validators.required],
      warehouseAddress: [null],
      uploadHealthLicenseFile: [null],
      uploadWarrantyLicenseFile: [null],
      uploadOperationLicenseFile: [null, Validators.required],
      uploadStandardBadgeFile: [null],
      address: [null, Validators.required],
      lat: [null],
      lang: [null],
      companyAddress: [null],
      emailAddress: [null],
      logoFile: [null]

    });

  }

  storeFieldChange() {
    this.customerInfoGroup.controls.isStore?.valueChanges.subscribe(
      (value: number) => {
        this.isStore = value;
      }
    );
  }

  getLocation(event) {
    this.isShowMap = event.isShow;
    if (this.isStore == 1) {
      this.storeGroup.controls.lat.setValue(event.lat);
      this.storeGroup.controls.lang.setValue(event.lng);
      this.latStore = event.lat;
      this.langStore = event.lng;
    } else if (this.isStore == 2) {
      this.factoryeGroup.controls.lat.setValue(event.lat);
      this.factoryeGroup.controls.lang.setValue(event.lng);
      this.latFactory = event.lat;
      this.langFactory = event.lng;
    }
  }

  showHideMap() {
    this.isShowMap = !this.isShowMap;
  }

  getPreRegisterData() {
    this.authService.preRegisterData.subscribe(
      (data: any) => {
        this.mobileNumber = data.mobileNumber;
        this.mobileNumber = this.mobileNumber.replace('0', '98');
        this.verificationCode = data.verificationCode;
      }
    );
  }

  onSubmit() {
    const data = {
      firstName: this.customerInfoGroup.controls.firstName.value,
      lastName: this.customerInfoGroup.controls.lastName.value,
      isLegal: this.customerInfoGroup.controls.isLegal.value,
      isValid: true,
      mobileNumber: this.mobileNumber,
      verificationCode: this.verificationCode,
      address: this.customerInfoGroup.controls.address.value,
      cusromerTypes: '0',
      nationalCode: this.customerInfoGroup.controls.nationalCode.value,
      verificationDone: true,
      nationalCodeImageUrl: this.customerInfoGroup.controls.nationalCodeImageUrl.value,
      isFainalNationalCodeValid: true,
      OtaminFactorPercent: '10'
    };

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (this.customerInfoGroup.valid) {
      this.loading = true;
      this.spinnerService.show();
      this.authService.registerAfterValidate(formData).subscribe(
        (res: any) => {
          this.loading = false;
          this.spinnerService.hide();
          if (this.isStore == 1) {
            if (this.storeGroup.valid) {
              this.registerStore(res.result.model.uniqIndentifier);
            } else {
              this.toastr.error('پر کردن فیلد های ستاره دار الزامی است');
            }

          } else if (this.isStore == 2) {
            if (this.factoryeGroup.valid) {
              this.registerFactory(res.result.model.uniqIndentifier);
            } else {
              this.toastr.error('پر کردن فیلد های ستاره دار الزامی است');


            }

          } else {
            this.spinnerService.hide();
            this.toastr.success('ثبت نام شما با موفقیت انجام شد');
            this.router.navigate(['/']);
          }

        }
      );
    } else {
      this.toastr.error('پر کردن فیلد های ستاره دار الزامی است');


    }


  }

  registerStore(id: string) {
    this.spinnerService.show();
    this.loading = true;
    const data = {
      customerUniqIndentifier: id,
      ...this.storeGroup.value

    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    this.registerService.post('RegisterStore', formData).subscribe(
      (res) => {
        this.spinnerService.hide();
        this.loading = false;
        this.toastr.success('ثبت نام شما با موفقیت انجام شد');
        this.router.navigate(['/home']);

      }, error => {
        this.spinnerService.hide();
        this.loading = false;
        this.toastr.success('ثبت نام شما با موفقیت انجام شد');
        this.router.navigate(['/home']);

      }
    );
  }

  registerFactory(id: string) {
    this.spinnerService.show();
    this.loading = true;
    const data = {
      customerUniqIndentifier: id,
      ...this.factoryeGroup.value
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    this.registerService.post('RegisterFactory', formData).subscribe(
      (res) => {
        this.router.navigate(['/home']);
        this.spinnerService.hide();
        this.loading = false;

        this.toastr.success('ثبت نام شما با موفقیت انجام شد');


      }, error => {
        this.spinnerService.hide();
        this.loading = false;

      }
    );
  }

  onFileUploadNationalCardFrontImageSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        this.nationalCardFrontImage = file.name;
        this.storeGroup.controls.uploadNationalCardFrontImage.setValue(file);

      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');
      }

    }
  }

  onFileUploadNationalCardImageSelect(event) {
    if (this.isFainalNationalCode) {
      this.toastr.error('شما مجاز به ویرایش عکس کارت ملی نمیباشید');

    } else {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const size = Math.floor(file.size / 1024);
        if (size < 1024) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.nationalCodeImageUrl = reader.result as string;
            this.nationalCardFrontImage = file.name;
            this.customerInfoGroup.controls.nationalCodeImageUrl.setValue(file);

          };
        } else {
          this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');
        }

      }
    }

  }

  onFilUploadNationalCardBehindImageSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        this.nationalCardBehindImage = file.name;
        this.storeGroup.controls.uploadNationalCardBehindImage.setValue(file);
      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onFilUploadUploadStoreDocumentSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        this.uploadStoreDocumentName = file.name;
        this.storeGroup.controls.uploadStoreDocument.setValue(file);

      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onFilUploadUploaduploadBusinessLicenseSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        this.uploadBusinessLicenseName = file.name;
        this.storeGroup.controls.uploadBusinessLicense.setValue(file);
      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');


      }

    }
  }

// factory
  onFileUploadWarrantyLicenseFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        this.uploadWarrantyLicenseFileName = file.name;
        this.factoryeGroup.controls.uploadWarrantyLicenseFile.setValue(file);

      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onFileUploadHealthLicenseFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        this.uploadHealthLicenseFileName = file.name;
        this.factoryeGroup.controls.uploadHealthLicenseFile.setValue(file);
      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onFileUploadOperationLicenseFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        this.uploadOperationLicenseFileName = file.name;
        this.factoryeGroup.controls.uploadOperationLicenseFile.setValue(file);

      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onFileUploadStandardBadgeFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        this.uploadStandardBadgeFileName = file.name;
        this.factoryeGroup.controls.uploadStandardBadgeFile.setValue(file);

      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onFileUploadLogoFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        this.uploadLogoFileName = file.name;
        this.factoryeGroup.controls.logoFile.setValue(file);

      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onReset() {
    this.storeGroup.reset();
    this.factoryeGroup.reset();
    this.customerInfoGroup.reset();

  }

  onChangeUserType(event) {
    this.isShowArea = true;
    this.storeGroup.controls.consumerType.setValue(event.value);
    this.userTypeActivity = event.label;
  }

  getProfile() {
  
    this.spinnerService.show();
    this.authService.getProfile(this.currentUser.mobileNumber).subscribe(
      (data: any) => {
        window.localStorage.setItem('roleCode', data.result.model.roleCode);
console.log('getprofile in nedit',data);

        this.authService.mobileNumber = data.result.model.mobileNumber;
        this.authService.fullName = data.result.model.firstName + ' ' + data.result.model.lastName;
        this.nationalCodeImageUrl = data.result.model.nationalCodeImageUrl;
        this.customerInfoGroup.patchValue(data.result.model);
        this.storeGroup.patchValue(data.result.model.storeOutputDtos[0]);
        this.qr = data.result.model.storeOutputDtos[0].uniqIndentifier;
        this.customerInfoGroup.controls.nationalCode.value === 'null' ? '' : this.customerInfoGroup.controls.nationalCode.value;
        this.factoryeGroup.patchValue(data.result.model.factoryOutputDtos[0]);
        if (data.result.model.isFainalNationalCodeValid) {
          this.customerInfoGroup.controls.nationalCode.disable();
          this.isFainalNationalCode = true;
        }
        this.spinnerService.hide();
      }, () => {
        this.spinnerService.hide();
      }
    );
  }

  editProfile() {

    const data = {
      ...this.customerInfoGroup.value,
      customerId: this.currentUser.id,
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    this.spinnerService.show();
    this.authService.editProfile(formData).subscribe(
      (data) => {
        this.toastr.success('ویرایش اطلاعات با موفقیت انجام شد');
        this.getProfile();
        this.spinnerService.hide();
      }, () => {
        this.toastr.error('خطا در ویرایش اطلاعات');

        this.spinnerService.hide();
      }
    );
  }

  editFactory() {
   
    const data = {
      ...this.factoryeGroup.value,
      customerId: this.currentUser.id
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);

      this.factoyService.post('EditFactory', formData).subscribe(
        (res) => {

        }
      );
    }
  }

  editStore() {
 
    const data = {
      ...this.storeGroup.value,
      customerId: this.currentUser.id
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);

      this.storeService.post('EditStore', data).subscribe(
        (res) => {

        }
      );
    }
  }
}
