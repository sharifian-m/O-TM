import {formatDate} from '@angular/common';
import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, FormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {ShereCustomService} from 'src/app/core/services/share-custom/share-custom.service';

import {RegistrationService} from '../../../core/services/registeration/registration.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.scss']
})
export class CustomerRegisterComponent implements OnInit {
  isShowArea = true;
  provinces: any[] = [];
  towns: any[] = [];
  activityZone: any[] = [];
  userTypes: any[] = [
    {
      value: 7,
      displayText: 'مجموعه ورزشی',
      isSelected: false
    },
  ];
  factoryTypes: any[] = [
    {
      value: 0,
      displayText: 'مواد غذایی',
      isSelected: false
    }
  ];
  userTypeActivity = 'سوپر مارکت';
  customerInfoGroup: UntypedFormGroup;
  storeGroup: UntypedFormGroup;
  formData: any;
  factoryeGroup: UntypedFormGroup;
  isShowMap = true;
  isStore = 1;
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
  customerTypesEnum = [];
  defaultImageSrc = null;
  nationalCardFrontImageSrc = null;
  storeNationalCardFrontImageSrc = null;
  logoImageSrc = null;
  standardBadgeImageSrc = null;
  operationLicenseImageSrc = null;
  healthLicenseImageSrc = null;
  warrantyLicenseImageSrc = null;
  businessLicenseImageSrc = null;
  storeDocumentImageSrc = null;
  nationalCardBehindImageSrc = null;

  constructor(private fb: UntypedFormBuilder,
              private authService: AuthService,
              private spinnerService: NgxSpinnerService,
              private registerService: RegistrationService,
              private toastr: ToastrService,
              private router: Router,
              private shereCustom: ShereCustomService,
  ) {
  }

  ngOnInit(): void {

    this.userTypesEnum();
    this.supplierTypesEnum();
    this.getCustomerTypesEnumForCombo();
    this.customerInfoInitForm();
    this.getPreRegisterData();
    this.storeInitForm();
    this.factoyInitForm();
    this.storeFieldChange();
    this.getAllProvince();
    this.provinceChange();
    this.ativityZoneEnumForCombo();
    console.log(this.isStore);
  }

  customerInfoInitForm() {
    this.customerInfoGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      isLegal: [null, Validators.required],
      isStore: [1, Validators.required],
      address: [null],
      nationalCode: [''],
      inviteCode: [''],
      nationalCodeImageUrl: [''],
      phoneNumber2: [null]
    });


  }

  supplierTypesEnum() {
    this.shereCustom.get('GetAllSupplierTypesEnumForCombo').subscribe(
      (res: any) => {
        this.factoryTypes = res.result;
      }
    );
  }

  ativityZoneEnumForCombo() {
    this.shereCustom.get('GetAllActivityZoneEnumForCombo').subscribe(
      (res: any) => {
        this.activityZone = res.result;
      }
    );
  }

  userTypesEnum() {
    this.shereCustom.get('GetAllConsumerTypesEnumForCombo').subscribe(
      (res: any) => {
        this.userTypes = res.result;
      }
    );
  }

  getCustomerTypesEnumForCombo() {
    this.shereCustom.get('GetCusromerTypesEnumForCombo').subscribe(
      (res: any) => {
        this.customerTypesEnum = res.result;
      }
    );
  }

  storeInitForm() {
    this.storeGroup = this.fb.group({
      postalCode: [''],
      storeTitle: ['', Validators.required],
      storeDescription: [''],
      provinceId: ['', Validators.required],
      townShipId: ['', Validators.required],
      businessLicenseOfficialNewspaper: [null],
      storePhoneNumber: [null, Validators.required],
      storeAddress: [null, Validators.required],
      uploadNationalCardFrontImage: [null],
      uploadNationalCardBehindImage: [null],
      uploadStoreDocument: [null, Validators.required],
      uploadBusinessLicense: [null],
      lease: [null],
      storeArea: [null, this.isShowArea ? Validators.required : null],
      consumerType: [0, Validators.required],
      lat: [null, Validators.required],
      lang: [null, Validators.required],
      zone: [null],
      phoneNumber2: [null, Validators.required]

    });

  }

  factoyInitForm() {
    this.factoryeGroup = this.fb.group({
      postalCode: [''],
      factoryTitle: ['', Validators.required],
      factoryDescription: [''],
      phoneNumber: [null, Validators.required],
      warehouseAddress: [null],
      provinceId: ['', Validators.required],
      townShipId: ['', Validators.required],
      uploadHealthLicenseFile: [null],
      uploadWarrantyLicenseFile: [null],
      uploadOperationLicenseFile: [null, Validators.required],
      uploadStandardBadgeFile: [null],
      address: [null, Validators.required],
      lat: [null, Validators.required],
      lang: [null, Validators.required],
      supplierTypes: [0, Validators.required],
      companyAddress: [null],
      emailAddress: [null],
      logoFile: [null, Validators.required]

    });

  }

  storeFieldChange() {
    this.customerInfoGroup.controls.isStore.valueChanges.subscribe(
      (value: number) => {
        this.isStore = value;
      }
    );
  }

  parsNumber(value): number {

    return +value;
  }

  isStoreText(): string {

    if (this.isStore === 0) {
      return 'تامین کننده';
    } else if (this.isStore === 3) {
      return 'پخش';
    } else if (this.isStore === 5) {
      return 'بنکداری';
    } else {
      return 'تامین کننده و پخش';
    }

  }

  changeFactorytype(event) {
    this.factoryeGroup.controls.supplierTypes.setValue(event.target.value);
  }


  getLocation(event) {
    this.isShowMap = event.isShow;
    if (this.isStore === 1) {
      this.storeGroup.controls.lat.setValue(event.lat);
      this.storeGroup.controls.lang.setValue(event.lng);
      this.latStore = event.lat;
      this.langStore = event.lng;
    } else if (this.isStore !== 1 && this.isStore !== 2) {
      this.factoryeGroup.controls.lat.setValue(event.lat);
      this.factoryeGroup.controls.lang.setValue(event.lng);
      this.latFactory = event.lat;
      this.langFactory = event.lng;
      console.log(this.latFactory);
    }
  }

  showHideMap(): void {
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
    if (this.isStore !== 1 && this.isStore !== 2) {
      this.customerInfoGroup.get('phoneNumber2').setValidators(Validators.required);
      this.customerInfoGroup.get('phoneNumber2').updateValueAndValidity();
    } else {
      this.customerInfoGroup.get('phoneNumber2').clearValidators();
      this.customerInfoGroup.get('phoneNumber2').updateValueAndValidity();
    }
    const data = {
      firstName: this.customerInfoGroup.controls.firstName.value,
      lastName: this.customerInfoGroup.controls.lastName.value,
      isLegal: this.customerInfoGroup.controls.isLegal.value,
      isValid: true,
      mobileNumber: this.mobileNumber,
      verificationCode: this.verificationCode,
      address: this.customerInfoGroup.controls.address.value,
      cusromerTypes: this.isStore,
      nationalCode: this.customerInfoGroup.controls.nationalCode.value,
      verificationDone: true,
      nationalCodeImageUrl: this.customerInfoGroup.controls.nationalCodeImageUrl.value,
      OtaminFactorPercent: '0',
      inviteCode: this.customerInfoGroup.controls.inviteCode.value,
      phoneNumber2: this.customerInfoGroup.controls.phoneNumber2.value
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

          console.log('registerAfterValidate',res);
          const token=res.result.token;
          this.authService.storeTokenInfo(token);
          this.loading = false;
          if (res.result.reponseDescription && res.result.responseCode === '-2') {
            this.toastr.error(res.result.reponseDescription);
          } else {
            this.spinnerService.hide();
            const dataLocal = {
              mobileNumber: res.result.model.mobileNumber,
              verificationCode: res.result.model.verificationCode,
              uniqIdentifier: res.result.model.uniqIndentifier,
              customerType: res.result.model.cusromerTypes,
              firstName: res.result.model.firstName,
              lastName: res.result.model.lastName,
              customerId: res.result.model.id,
              nationalCode: res.result.model.nationalCode,
              phoneNumber2: res.result.model.phoneNumber2
            };
            if (this.isStore === 1) {
              if (this.storeGroup.valid) {
                // window.localStorage.setItem('currentUser', JSON.stringify(dataLocal));
this.authService.storeUserInfo(dataLocal);
                // this.router.navigate(['/customer-register'])
                this.authService.fullName = dataLocal.firstName + ' ' + dataLocal.lastName;
                this.authService.mobileNumber = dataLocal.mobileNumber;
                this.authService.isAuth = true;
                this.registerStore(res.result.model.uniqIndentifier);
              } else {
                if (this.storeGroup.controls.consumerType.invalid) {
                  this.toastr.error('لطفا نوع فروشگاه را وارد کنید');
                } else if (this.storeGroup.controls.provinceId.invalid) {
                  this.toastr.error('لطفااستان را وارد کنید');
                } else if (this.storeGroup.controls.townShipId.invalid) {
                  this.toastr.error('لطفا شهر را وارد کنید');
                } else if (this.storeGroup.controls.storeTitle.invalid) {
                  this.toastr.error('لطفا نام فروشگاه را وارد کنید');
                } else if (this.storeGroup.controls.storePhoneNumber.invalid) {
                  this.toastr.error('لطفا شماره تلفن را وارد کنید');
                } else if (this.storeGroup.controls.phoneNumber2.invalid) {
                  this.toastr.error('لطفا شماره تلفن اضطراری را وارد کنید');
                } else if (this.storeGroup.controls.storeArea.invalid) {
                  this.toastr.error('لطفا منطقه را وارد کنید');
                } else if (this.storeGroup.controls.lat.invalid) {
                  this.toastr.error('لطفا موقعیت مکانی را انتخاب کنید');
                } else if (this.storeGroup.controls.uploadStoreDocument.invalid) {
                  this.toastr.error('لطفا جواز فعالیت را بارگذاری کنید');
                } else if (this.storeGroup.controls.storeAddress.invalid) {
                  this.toastr.error('لطفاآدرس فروشگاه را وارد کنید');
                }
                // this.toastr.error('پر کردن فیلد های ستاره دار در قسمت سوپر ماکت الزامی است');
              }

            } else if (this.isStore !== 1 && this.isStore !== 2) {
              if (this.factoryeGroup.valid) {
                this.registerFactory(res.result.model.uniqIndentifier);
              } else {
                if (this.factoryeGroup.controls.provinceId.invalid) {
                  this.toastr.error('لطفااستان را وارد کنید');
                } else if (this.factoryeGroup.controls.townShipId.invalid) {
                  this.toastr.error('لطفا شهر را وارد کنید');
                } else if (this.factoryeGroup.controls.factoryTitle.invalid) {
                  this.toastr.error('لطفا نام برند را وارد کنید');
                } else if (this.factoryeGroup.controls.phoneNumber.invalid) {
                  this.toastr.error('لطفا شماره تلفن خود را وارد کنید');
                } else if (this.factoryeGroup.controls.address.invalid) {
                  this.toastr.error('لطفا آدرس دفتر مرکزی را وارد کنید');
                } else if (this.factoryeGroup.controls.lat.invalid) {
                  this.toastr.error('لطفا موقعیت مکانی خود را وارد کنید');
                } else if (this.factoryeGroup.controls.uploadOperationLicenseFile.invalid) {
                  this.toastr.error('لطفا جواز فعالیت خود را بارگذاری کنید');
                } else if (this.factoryeGroup.controls.logoFile.invalid) {
                  this.toastr.error('لطفا لوگو خود را بارگذاری کنید');
                }
                // this.toastr.error('پر کردن فیلد های ستاره دار الزامی است');

              }

            } else {
              this.authService.storeUserInfo(dataLocal);
              // this.router.navigate(['/customer-register'])
              this.authService.fullName = dataLocal.firstName + ' ' + dataLocal.lastName;
              this.authService.mobileNumber = dataLocal.mobileNumber;
              this.authService.isAuth = true;
              this.spinnerService.hide();

              this.toastr.success('ثبت نام شما با موفقیت انجام شد');
              this.router.navigate(['/home']);
              this.toastr.success('با موفقیت وارد شدید');
            }

          }
        }
      );
    } else {
      console.log(this.isStore);
      if (this.customerInfoGroup.controls.firstName.invalid) {
        this.toastr.error('لطفا نام خود را وارد کنید');
      } else if (this.customerInfoGroup.controls.lastName.invalid) {
        this.toastr.error('لطفا نام خانوادگی خود را وارد کنید');
      } else if (this.customerInfoGroup.controls.phoneNumber2.invalid) {
        this.toastr.error('لطفا شماره تلفن اضطراری را وارد کنید');
      } else if (this.customerInfoGroup.controls.isLegal.invalid) {
        this.toastr.error('لطفا چک باکس حقیقی یا حقوقی را پر کنید');
      }
      // this.toastr.error('پر کردن فیلد های ستاره دار الزامی است');


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
      if (data[key] || data[key] === 0) {
        formData.append(key, data[key]);
      }
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
        this.toastr.error('  خطا در ثبت فروشگاه ');
        window.localStorage.removeItem('currentUser');
        window.localStorage.removeItem('token');
        this.authService.isAuth = false;


      }
    );
  }

  registerFactory(id: string) {
    this.spinnerService.show();
    this.loading = true;
    const data = {
      customerUniqIndentifier: id,
      ...this.factoryeGroup.value,
      factoryName: this.factoryeGroup.controls.factoryTitle.value
    };


    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
    this.registerService.post('RegisterFactory', formData).subscribe(
      (res) => {
        this.router.navigate(['/home']);
        this.spinnerService.hide();
        this.loading = false;

        this.toastr.success('ثبت نام شما با موفقیت انجام شد');
        window.location.href = 'https://cpanel.otamin.ir/#/';

      }, error => {
        this.spinnerService.hide();
        this.toastr.error('خطا در ثبت اطلاعات');
        this.loading = false;

      }
    );
  }

  onFileUploadNationalCardFrontImageSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.storeNationalCardFrontImageSrc = reader.result as string;
          // this.nationalCardFrontImage = file.name;
          this.storeGroup.controls.uploadNationalCardFrontImage.setValue(file);
        };
      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');
      }

    }
  }

  onFileUploadNationalCardImageSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.nationalCardFrontImageSrc = reader.result as string;
          // this.nationalCardFrontImage = file;
          this.customerInfoGroup.controls.nationalCodeImageUrl.setValue(file);
        };
      } else {
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
          // this.nationalCardBehindImage = file.name;
          this.storeGroup.controls.uploadNationalCardBehindImage.setValue(file);
        };
      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onFilUploadStoreDocumentSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.storeDocumentImageSrc = reader.result as string;
          // this.uploadStoreDocumentName = file.name;
          this.storeGroup.controls.uploadStoreDocument.setValue(file);

        };
      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');

      }

    }
  }

  onFilUploadBusinessLicenseSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (size < 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.businessLicenseImageSrc = reader.result as string;
          // this.uploadBusinessLicenseName = file.name;
          this.storeGroup.controls.uploadBusinessLicense.setValue(file);
        };
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
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.warrantyLicenseImageSrc = reader.result as string;
          // this.uploadWarrantyLicenseFileName = file.name;
          this.factoryeGroup.controls.uploadWarrantyLicenseFile.setValue(file);

        };
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
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.healthLicenseImageSrc = reader.result as string;
          // this.uploadHealthLicenseFileName = file.name;
          this.factoryeGroup.controls.uploadHealthLicenseFile.setValue(file);
        };
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
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.operationLicenseImageSrc = reader.result as string;
          // this.uploadOperationLicenseFileName = file.name;
          this.factoryeGroup.controls.uploadOperationLicenseFile.setValue(file);

        };
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
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.standardBadgeImageSrc = reader.result as string;
          // this.uploadStandardBadgeFileName = file.name;
          this.factoryeGroup.controls.uploadStandardBadgeFile.setValue(file);

        };
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
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.logoImageSrc = reader.result as string;
          // this.uploadLogoFileName = file.name;
          this.factoryeGroup.controls.logoFile.setValue(file);

        };
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
    this.userTypeActivity = this.userTypes.find(u => u.value === event.target.value).displayText;
    this.isShowArea = !(this.userTypeActivity === 'هتل' || this.userTypeActivity === 'بیمارستان' ||
      this.userTypeActivity === 'تعاونی' || this.userTypeActivity === 'شخصی');
    this.storeGroup.controls.consumerType.setValue(+event.target.value);
    this.userTypeActivity = this.userTypes.find(u => u.value === event.target.value).displayText;
  }

  onChangeZone(event) {

    this.storeGroup.controls.zone.setValue(+event.target.value);

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
    this.factoryeGroup.controls.provinceId.valueChanges.subscribe(
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

  checkSelectProvinceFactory() {
    if (!this.factoryeGroup.controls.provinceId.value) {
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
}
