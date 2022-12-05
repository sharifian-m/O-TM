import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { loadTranslations } from '@angular/localize';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ShereCustomService } from 'src/app/core/services/share-custom/share-custom.service';
import { TicketService } from 'src/app/core/services/ticket/ticket.service';

@Component({
  selector: 'app-representation',
  templateUrl: './representation.component.html',
  styleUrls: ['./representation.component.scss']
})
export class RepresentationComponent implements OnInit {
  representationalFormGroup: UntypedFormGroup;
  provinces: any[] = [];
  provincesIdStr:any;
  townShipIdStr:any;
  towns: any[] = [];
 
  formData: any;
 
  isShowMap = true;
  isStore = 1;
  marital:string='0';
  maritalStatus:any;
  educations :any;
  dutyStatus:any ;
  attachmentFileUrl: string;
  currentUser:any;
  loading = false;;
  hasOffice=[ {name: 'true'},
  {name: 'false'},];
  radioSelected: any;
  constructor(private fb: UntypedFormBuilder, private toastr: ToastrService,
    private shereCustomService: ShereCustomService, private authService: AuthService,
    private spinnerService: NgxSpinnerService,
    private shareService: ShereCustomService,private ticketService: TicketService,
    ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.representationalForm();
    this.getAllProvince();
    this.provinceChange();
    this.getMaritalStatus();
    this.getDutyStatus();
    this.getEducations()
  }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  getMaritalStatus(){
    this.shereCustomService.get('GetMartialStatusEnumForCombo').subscribe((res: any) => {
      this.maritalStatus = res.result;
            
    },(err)=>{
      console.log('err',err);
      
    }
  );
}
getDutyStatus(){
 this.shereCustomService.get('GetMilitaryStatusEnumForCombo').subscribe((res: any) => {
   this.dutyStatus = res.result;
    
 },(err)=>{
   console.log('err',err);
  
 }
);

}
getEducations(){
 this.shereCustomService.get('GetEducationEnumForCombo').subscribe((res: any) => {
   this.educations = res.result;
  
     
 },(err)=>{
   console.log('err',err); 
 }
);

}

  representationalForm(){
    this.representationalFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      Address:['', Validators.required],
      provinceId: ['', Validators.required],
      townShipId: ['', Validators.required],
      description: [''],
      hasOfficeplace: ['', Validators.required],
      resumeFile: [''],
  
    });
  }
  getAllProvince() {

    this.shereCustomService.get('GetAllProvinceForCombo').subscribe(
      (res: any) => {
        console.log('res',res);
        
        this.provinces = res.result;
        
      }
    );
  }

  
  provinceChange() {
    this.representationalFormGroup.controls.provinceId.valueChanges.subscribe(
      (value) => {

        this.provincesIdStr= this.provinces.find(u => u.value === value)?.displayText;
        this.getAllTownByProvinceId(value);
      }
    );
    
  }

  

  checkSelectProvinceStore() {
    if (!this.representationalFormGroup.controls.provinceId.value) {
      this.toastr.error('لطفا استان مورد نظر خود را انتخاب کنید');
    }
  }
  
  getAllTownByProvinceId(id: any) {
    
    let params = new HttpParams();
    params = params.set('provinceId', id).set('maxResultCount', '10000');
    this.shereCustomService.get('GetAllTownshipByProvinceIdForCombo', params).subscribe(
      (res: any) => {
            
        this.towns = res.result;
      }
    );
  }
  
  onFileUploadResume(event) {
    console.log('event', event);
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      console.log('event', event);
      if (event.target.files[0].type === 'application/pdf'
        || event.target.files[0].type === 'application/doc'
        || event.target.files[0].type === 'application/docx'
      ) {
        if (size < 1000000) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.attachmentFileUrl = reader.result as string;
            this.representationalFormGroup.controls.resumeFile.setValue(file);
          };
        } else {
          this.toastr.error('حجم فایل باید کمتر از ده مگابایت باشد');
        }
      } else {
        this.toastr.error('لطفا نوع فایل را pdf , doc, docx انتخاب کنید.');

      }

    }
  }
  onSubmit() {
    // console.log('hasOfficeBind',this.hasOfficeBind);
    
    let townId=this.representationalFormGroup.controls.townShipId.value;
    this.townShipIdStr=this.towns.find(u => u.value === townId).displayText;
    console.log('this.townShipIdStr',this.townShipIdStr);
    
    const data = {
      Id: 0,
      Title: 'اخذ نمایندگی',
      // CustomerId: user ? user?.customerId : null,
      TicketState: 1,
      TicketStateStr: '',
      TicketType: 2,
      TicketTypeStr: '',
      Description: '',
      PanelTypeEnum:3,
      TicketCategory:21,
      TicketCategoryStr: 'نمایندگی',
     
      // creationTimeStr: '',
      // creationTime: '',
      FullName: this.currentUser ? (this.currentUser?.firstName + this.currentUser?.lastName) : '',
      PhoneNumber: this.currentUser ? this.currentUser?.mobileNumber : 0,
      Address: '',
      Lat: 0,
      Long: 0,
     
      AttachmentFile: this.representationalFormGroup.controls.resumeFile.value,
      'AgencyInfo.FirstName': this.representationalFormGroup.controls.firstName.value,
      'AgencyInfo.LastName': this.representationalFormGroup.controls.lastName.value,
      'AgencyInfo.Address': this.representationalFormGroup.controls.Address.value,
      'AgencyInfo.MobileNumber': this.representationalFormGroup.controls.phoneNumber.value,
      'AgencyInfo.ProvinceId': this.representationalFormGroup.controls.provinceId.value,
      'AgencyInfo.ProvinceStr': this.provincesIdStr,
      'AgencyInfo.TownshipId': this.representationalFormGroup.controls.townShipId.value,
      'AgencyInfo.TownshipStr': this.townShipIdStr,
      'AgencyInfo.HasOffice': this.radioSelected,
      'AgencyInfo.Description': this.representationalFormGroup.controls.description.value,
      
   
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (this.representationalFormGroup.valid) {
     
      
      this.loading = true;
      this.spinnerService.show();
      this.ticketService.post('Create', formData).subscribe(
        (res: any) => {
          this.loading = false;
          this.spinnerService.hide();
          if (res.success === true) {
            this.toastr.success('عملیات با موفقیت انجام شد.');
            this.onReset();
          } else {
            this.loading = false;
            this.spinnerService.hide();
            this.toastr.error('عملیات با خطا مواجه شد.');
          }
        }
      );
    } 
    else {
      if (this.representationalFormGroup.controls.firstName.value === '') {
        this.toastr.error('لطفا نام خود را وارد کنید');

      } else if (this.representationalFormGroup.controls.lastName.value === '') {
        this.toastr.error('لطفا نام خانوادگی خود را وارد کنید');

      } else if (this.representationalFormGroup.controls.phoneNumber.value === '') {
        this.toastr.error('لطفا شماره همراه خود را وارد کنید');

      } else if (this.representationalFormGroup.controls.Address.value === '') {
        this.toastr.error('لطفا آدرس خود را وارد کنید');
     
      } else if (this.representationalFormGroup.controls.townShipId.value === '') {
        this.toastr.error('لطفا شهر خود را وارد کنید');

      } else if (this.representationalFormGroup.controls.hasOffice.value === '') {
        this.toastr.error(' لطفا دارا بودن فروشگاه را مشخص کنید ');
     
      } 
      
    }
  }

  onReset() {
    this.representationalFormGroup.reset();
  }
}
