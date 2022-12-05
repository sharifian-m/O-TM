import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../core/services/category/category.service';
import {HttpParams} from '@angular/common/http';
import {ShereCustomService} from '../../../core/services/share-custom/share-custom.service';
import {ToastrService} from 'ngx-toastr';
import {TicketService} from '../../../core/services/ticket/ticket.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-cooperate-with-us',
  templateUrl: './cooperate-with-us.component.html',
  styleUrls: ['./cooperate-with-us.component.scss']
})
export class CooperateWithUsComponent implements OnInit {
  categories: any[] = [];
  cooperationFormGroup: UntypedFormGroup;
  ticketCategory: any;
  loading = false;
  currentUser:any;
  constructor(private fb: UntypedFormBuilder, private categoryService: CategoryService,
              private toastr: ToastrService,private authService: AuthService,
              private ticketService: TicketService, private spinnerService: NgxSpinnerService,
              private shareService: ShereCustomService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.cooperationInitForm();
    this.getCategories();
    this.getTicketCategories();
  }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  getCategories() {
    this.categoryService.get('getAll').subscribe(
      (res: any) => {
        this.categories = res.result.items;
      }
    );
  }

  getTicketCategories() {
    let params = new HttpParams();
    params = params.set('type', '1');
    this.shareService.get('GetAllTicketCategoryEnumForCombo', params).subscribe((res: any) => {
      this.ticketCategory = res.result;
    });
  }

  cooperationInitForm() {
    this.cooperationFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      ticketCategory: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: [''],
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
  
    const data = {
      Id: 0,
      Title: 'همکاری با ما',
      // CustomerId: user ? user?.customerId : null,
      TicketState: 1,
      TicketStateStr: '',
      TicketCategory: this.cooperationFormGroup.controls.ticketCategory.value,
      TicketCategoryStr: '',
      TicketType: 1,
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
      AttachmentFile: '',
      'WorkWithUsInfo.FirstName': this.cooperationFormGroup.controls.firstName.value,
      'WorkWithUsInfo.LastName': this.cooperationFormGroup.controls.lastName.value,
      'WorkWithUsInfo.Address': this.cooperationFormGroup.controls.address.value,
      'WorkWithUsInfo.MobileNumber': this.cooperationFormGroup.controls.mobileNumber.value,
      'WorkWithUsInfo.Email': this.cooperationFormGroup.controls.email.value,
      'WorkWithUsInfo.ProductName': this.cooperationFormGroup.controls.productName.value,
      'WorkWithUsInfo.ProductCategory': this.cooperationFormGroup.controls.productCategory.value,
      'WorkWithUsInfo.Description': this.cooperationFormGroup.controls.description.value
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (this.cooperationFormGroup.valid) {
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
      if (this.cooperationFormGroup.controls.firstName.value === '') {
        this.toastr.error('لطفا نام خود را وارد کنید');

      } else if (this.cooperationFormGroup.controls.lastName.value === '') {
        this.toastr.error('لطفا نام خانوادگی خود را وارد کنید');

      } else if (this.cooperationFormGroup.controls.address.value === '') {
        this.toastr.error('لطفا آدرس خود را وارد کنید');

      } else if (this.cooperationFormGroup.controls.ticketCategory.value === '') {
        this.toastr.error('لطفا نوع مشتری را وارد کنید');

      } else if (this.cooperationFormGroup.controls.mobileNumber.value === '') {
        this.toastr.error('لطفا شماره همراه خود را وارد کنید');

      } else if (this.cooperationFormGroup.controls.productName.value === '') {
        this.toastr.error('لطفا نام کالای خود را وارد کنید');

      } else if (this.cooperationFormGroup.controls.productCategory.value === '') {
        this.toastr.error('لطفا دسته بندی را وارد کنید');

      }
    }
  }

  onChangeCategory(event) {
    this.cooperationFormGroup.controls.productCategory.setValue(event.target.value);
  }

  onChangeTicketCategory(event) {
    this.cooperationFormGroup.controls.ticketCategory.setValue(event.target.value);

  }
  onReset() {
    this.cooperationFormGroup.reset();
  }
}
