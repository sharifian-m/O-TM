import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {localizePolyfill} from '@angular/localize/schematics/ng-add';
import {ToastrService} from 'ngx-toastr';
import {TicketService} from '../../../core/services/ticket/ticket.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ShereCustomService} from '../../../core/services/share-custom/share-custom.service';
import {HttpParams} from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {

  maritalStatus:any;
  educations :any;
  dutyStatus:any ;
    employeeFormGroup: UntypedFormGroup;
  ticketCategory: any[] = [];
  attachmentFileUrl: string;
  loading = false;
  currentUser:any;
  marital:string='';
  constructor(private fb: UntypedFormBuilder, private toastr: ToastrService,
              private ticketService: TicketService, private spinnerService: NgxSpinnerService,
              private shareService: ShereCustomService,
              private authService: AuthService,
              private shereCustomService: ShereCustomService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.employeeInitForm();
    this.getTicketCategories();
    this.getMaritalStatus();
    this.getDutyStatus();
    this.getEducations();
  }
  getMaritalStatus(){
     this.shereCustomService.get('GetMartialStatusEnumForCombo').subscribe((res: any) => {
       this.maritalStatus = res.result;
       console.log('this.maritalStatus',this.maritalStatus);
       
            
     },(err)=>{
       console.log('err',err);
       
     }
   );
   
 }
 getDutyStatus(){
  this.shereCustomService.get('GetMilitaryStatusEnumForCombo').subscribe((res: any) => {
    this.dutyStatus = res.result;
    console.log('this.dutyStatus',this.dutyStatus);
    
         
  },(err)=>{
    console.log('err',err);
    
  }
);

}
getEducations(){
  this.shereCustomService.get('GetEducationEnumForCombo').subscribe((res: any) => {
    this.educations = res.result;
    console.log('this.educations',this.educations);
    
         
  },(err)=>{
    console.log('err',err);
    
  }
);

}
 onChangeMaritalStatus(event) {

  this.employeeFormGroup.controls.maritalStatus.setValue(event.target.value);
    
}

 getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  employeeInitForm() {
    this.employeeFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      numberOfChildren: ['', Validators.required],
      address: ['', Validators.required],
      ticketCategory: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: [''],
      militaryStatus: ['',Validators.required],
      educationLevel: ['', Validators.required],
      description: [''],
      resumeFile: [''],
    });
  }



  getTicketCategories() {
    let params = new HttpParams();
    params = params.set('type', '0');
    this.shareService.get('GetAllTicketCategoryEnumForCombo', params).subscribe((res: any) => {
      this.ticketCategory = res.result;
    });
  }

  onChangeEducations(event) {
    this.employeeFormGroup.controls.educationLevel.setValue(event.target.value);

  }

  onChangeMilitaryStatus(event) {
    this.employeeFormGroup.controls.militaryStatus.setValue(event.target.value);

console.log('onChangeMilitaryStatus');

  }

  // onChangeTicketCategory(event) {
  //   this.employeeFormGroup.controls.ticketCategory.setValue(event.target.value);

  // }

  onFileUploadResume(event) {
    console.log('event',event);
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const size = Math.floor(file.size / 1024);
      if (event.target.files[0].type === 'application/pdf'
        || event.target.files[0].type === 'application/doc'
        || event.target.files[0].type === 'application/docx'
      ) {
        if (size < 1000000) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.attachmentFileUrl = reader.result as string;
            this.employeeFormGroup.controls.resumeFile.setValue(file);
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
console.log('hiiiiiii  in submit');

    const data = {
      Id: 0,
      Title: 'استخدام',
      // CustomerId: user ? user?.customerId : null,
      TicketState: 1,
      TicketStateStr: '',
      TicketCategory: this.employeeFormGroup.controls.ticketCategory.value,
      TicketCategoryStr: '',
      TicketType: 0,
      TicketTypeStr: '',
      Description: '',
      PanelTypeEnum:3,
      // creationTimeStr: '',
      // creationTime: '',
      FullName: this.currentUser ? (this.currentUser?.firstName + this.currentUser?.lastName) : '',
      PhoneNumber: this.currentUser ? this.currentUser?.mobileNumber : 0,
      Address: '',
      Lat: 0,
      Long: 0,
      AttachmentFile: this.employeeFormGroup.controls.resumeFile.value,
      AttachmentFileUrl: '',
      'EmploymentInfo.FirstName': this.employeeFormGroup.controls.firstName.value,
      'EmploymentInfo.LastName': this.employeeFormGroup.controls.lastName.value,
      'EmploymentInfo.MaritalStatus': this.employeeFormGroup.controls.maritalStatus.value,
      'EmploymentInfo.NumberOfChildren': this.employeeFormGroup.controls.numberOfChildren.value,
      'EmploymentInfo.Address': this.employeeFormGroup.controls.address.value,
      'EmploymentInfo.MobileNumber': this.employeeFormGroup.controls.mobileNumber.value,
      'EmploymentInfo.Email': this.employeeFormGroup.controls.email.value,
      'EmploymentInfo.MilitaryStatus': this.employeeFormGroup.controls.militaryStatus.value,
      'EmploymentInfo.EducationLevel': this.employeeFormGroup.controls.educationLevel.value,
      'EmploymentInfo.Description': this.employeeFormGroup.controls.description.value,
     
    
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    console.log('formData',formData);
    
    if (this.employeeFormGroup.valid) {
      console.log('form valid');
      
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
    } else {
      if (this.employeeFormGroup.controls.firstName.value === '') {
        this.toastr.error('لطفا نام خود را وارد کنید');

      } else if (this.employeeFormGroup.controls.lastName.value === '') {
        this.toastr.error('لطفا نام خانوادگی خود را وارد کنید');

      } else if (this.employeeFormGroup.controls.maritalStatus.value === '') {
        this.toastr.error('لطفا وضعیت تاهل خود را انتخاب کنید');

      } else if (this.employeeFormGroup?.controls?.numberOfChildren.value === '' && this.marital==='1') {
        this.toastr.error('لطفا تعداد فرزندان خود را وارد کنید');

      } else if (this.employeeFormGroup.controls.address.value === '') {
        this.toastr.error('لطفا آدرس خود را وارد کنید');

      } else if (this.employeeFormGroup.controls.ticketCategory.value === '') {
        this.toastr.error('لطفا نوع تیم را انتخاب کنید');

      } else if (this.employeeFormGroup.controls.mobileNumber.value === '') {
        this.toastr.error('لطفا شماره همراه خود را وارد کنید');

      } else if (this.employeeFormGroup.controls.militaryStatus.value === '') {
        this.toastr.error('لطفا وضعیت نظام وظیفه خود را وارد کنید');

      } else if (this.employeeFormGroup.controls.educationLevel.value === '') {
        this.toastr.error('لطفا میزان تحصیلات خود را وارد کنید');

    
      // } else {
      //   this.toastr.error('پر کردن فیلد های ستاره دار الزامی است');
      }
    }
  }


  onReset() {
    this.employeeFormGroup.reset();
  }

}
