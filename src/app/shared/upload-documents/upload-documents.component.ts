import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../../core/services/registeration/registration.service';
import {Router} from '@angular/router';
import {ShereCustomService} from '../../core/services/share-custom/share-custom.service';
import {HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {StoreService} from '../../core/services/store/store.service';
import {identity} from 'rxjs';
import {StoreInformationComponent} from '../../modules/user-panel/my-store/store-information/store-information.component';
import {AuthService} from '../../core/services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {multicast} from 'rxjs/operators';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit {
  UploadBusinessLicenseBadgeFileName: string;
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
  storeId: any;
  marketerUniqIdentifier: any;
  nationalCardFrontImageSrc = null;
  nationalCardBehindImageSrc = null;
  businessLicenseImageSrc = null;
  storeDocumentImageSrc = null;
  towns: any[] = [];
  storeInfo: any;
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
  userTypeActivity = 'سوپر مارکت';
  storeGroup: UntypedFormGroup;

  constructor(private toastr: ToastrService,
              private modal: NgbActiveModal,
              private fb: UntypedFormBuilder,
              private registerService: RegistrationService,
              private router: Router,
              private shareCustom: ShereCustomService,
              private storeService: StoreService,
              private modalService: NgbModal,
              private authService: AuthService,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.storeInitForm();
    this.getAllProvince();
    this.provinceChange();
    this.getAllConsumerTypes();
    this.getAllRegion();
    this.getStoreInfo();
  }

  close() {
    this.modal.dismiss();
  }

  storeInitForm() {
    this.storeGroup = this.fb.group({
      postalCode: [{ value: '', disabled: true }, Validators.required],
      storeTitle: [{ value: '', disabled: true }, Validators.required],
      storeDescription: [{ value: '', disabled: true }],
      provinceId: [{ value: '', disabled: true }, Validators.required],
      townShipId: [{ value: '', disabled: true }, Validators.required],
      businessLicenseOfficialNewspaper: [{ value: null, disabled: true }],
      storePhoneNumber: [{ value: null, disabled: true }, Validators.required],
      storeAddress: [{ value: null, disabled: true }, Validators.required],
      uploadNationalCardFrontImage: [null],
      uploadNationalCardBehindImage: [null],
      uploadStoreDocument: [null],
      uploadBusinessLicense: [null],
      lease: [{ value: null, disabled: true }],
      storeArea: [{ value: null, disabled: true }],
      consumerType: [{ value: '0', disabled: true }],
      lat: [{ value: null, disabled: true }],
      lang: [{ value: null, disabled: true }],
      zone: [{ value: null, disabled: true }]

    });

  }
  updateStore() {
    this.spinnerService.show();
    const data = {
      id: this.storeId,
      UploadBusinessLicenseFile: this.storeGroup.controls.uploadBusinessLicense.value,
      NationalCardFrontImageFile: this.storeGroup.controls.uploadNationalCardFrontImage.value,
      NationalCardBehindImageFile: this.storeGroup.controls.uploadNationalCardBehindImage.value,
      UploadStoreDocumentFile: this.storeGroup.controls.uploadStoreDocument.value,
    };
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    this.modal.dismiss();
    this.storeService.put('UpdateStoreDocuments', formData).subscribe(
      (res) => {
        this.toastr.success('فروشگاه شما با موفقیت ویرایش شد');
        this.router.navigate(['/user-panel/my-store']);
        this.spinnerService.hide();
      }, error => {
        this.toastr.error('خطا در ویرایش اطلاعات');
        this.spinnerService.hide();
      }
    );
    if (this.storeGroup.controls.uploadBusinessLicense.value) {
      this.shareCustom.nextStepDisabled = false;
    }

  }

  getAllRegion() {
    this.shareCustom.get('GetAllActivityZoneEnumForCombo').subscribe(
      (res: any) => {
        this.regions = res.result;
      }
    );
  }

  getAllConsumerTypes() {
    this.shareCustom.get('GetAllConsumerTypesEnumForCombo').subscribe(
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
    this.langStore = event.lng;
    

  }

  getAllProvince() {

    this.shareCustom.get('GetAllProvinceForCombo').subscribe(
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
    this.shareCustom.get('GetAllTownshipByProvinceIdForCombo', params).subscribe(
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
          this.storeInfo.nationalCardFrontImage = file;
          this.storeGroup.controls.uploadNationalCardFrontImage.setValue(file);
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
          this.storeInfo.nationalCardBehindImage = file;
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
          this.storeInfo.uploadStoreDocument = file;
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
          this.storeInfo.uploadBusinessLicense = file;
          this.storeGroup.controls.uploadBusinessLicense.setValue(file);
        };
      } else {
        this.toastr.error('حجم فایل باید کمتر از یک مگابایت باشد');
      }

    }
  }

  getStoreInfo() {
    let params = new HttpParams();
    this.storeId = this.shareCustom.storeId;
    // this.marketerUniqIdentifier = this.shareCustom.marketerUniqIdentifier;
    params = params.set('id', this.storeId);
    this.storeService.get('Get', params).subscribe((res: any) => {
      this.storeInfo = res.result;
      this.storeGroup.controls.storeTitle?.setValue(this.storeInfo?.storeTitle);
      this.storeGroup.controls.consumerType?.setValue(this.storeInfo?.consumerType);
      this.storeGroup.controls.businessLicenseOfficialNewspaper?.setValue(this.storeInfo?.businessLicenseOfficialNewspaper);
      this.storeGroup.controls.provinceId?.setValue(this.storeInfo?.provinceId);
      this.storeGroup.controls.townShipId?.setValue(this.storeInfo?.townshipId);
      this.storeGroup.controls.storeAddress?.setValue(this.storeInfo?.storeAddress);
      this.storeGroup.controls.postalCode?.setValue(this.storeInfo?.postalCode);
      this.storeGroup.controls.storeArea?.setValue(this.storeInfo?.storeArea);
      this.storeGroup.controls.storePhoneNumber?.setValue(this.storeInfo?.storePhoneNumber);
      this.storeGroup.controls.zone?.setValue(this.storeInfo?.zone);
      this.storeGroup.controls.storeDescription?.setValue(this.storeInfo?.storeDescription);
    });

  }

  qrCode(item) {
    const ref = this.modalService.open(StoreInformationComponent, {},);
    ref.componentInstance.type = 'qr';

    ref.componentInstance.qr = item.uniqIndentifier;
  }
}
