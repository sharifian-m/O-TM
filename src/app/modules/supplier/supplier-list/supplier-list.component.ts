import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {CustomerBrandsService} from '../../../core/services/customer-brands-crud/customer-brands.service';
import {SupplierPolicyService} from '../../../core/services/supplier-policy/supplier-policy.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  customerInfo: any;
  supplierInfo: any;
  suppliersList: any;
  q = 1;
  totalCount: number;
  searchGroup: UntypedFormGroup;
  constructor(private customerBrandService: CustomerBrandsService,
              private supplierPolicyService: SupplierPolicyService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private fb: UntypedFormBuilder,) {
  }

  ngOnInit(): void {
    this.initForm();
    window.scrollTo(0, 0);
    this.getSuppliersList();
  }
  initForm() {
    this.searchGroup = this.fb.group(
      {
        searchInput: ['']
      }
    );
    this.searchSupplier();
  }
  getSuppliersList() {
    let params = new HttpParams();
    const skipCount = 30 * (this.q - 1);
    params = params.set('maxResultCount', '30').set('skipCount', skipCount.toString());
    this.spinner.show();
    this.supplierPolicyService.get('GetAll', params).subscribe((res: any) => {
        this.totalCount = res.result.totalCount;
        this.suppliersList = res.result.items;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
        this.toastr.error('خطا در دریافت اطلاعات');
      }
    );
  }
  getSuppliers(supplierTitle: string = ''): any {

    let params = new HttpParams();
    if (supplierTitle !== '') {
      params = params.set('supplierTitle', supplierTitle).set('maxResultCount', '30').set('skipCount', '0');

    } else {
      params = params.set('maxResultCount', '30').set('skipCount', '0');

    }
    this.spinner.show();
    this.supplierPolicyService.get('GetAll', params).subscribe(
      (res: any) => {
        this.totalCount = res.result.totalCount;
        this.suppliersList = res.result.items;

        this.spinner.hide();

      }, () => {
        this.spinner.hide();
        this.toastr.error('خطا در دریافت اطلاعات');
      }
    );
  }
  pageChanged(event) {
    this.q = event;
    this.getSuppliersList();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  searchSupplier() {
    this.searchGroup.valueChanges.pipe(
      debounceTime(600),
      map(form => form.searchInput),
      distinctUntilChanged(),
      // filter(term => term.length >= 2),
      tap(() => {
        this.q = 1;
      }),
      switchMap((search) =>
        of(this.getSuppliers(search))
      ),
    ).subscribe();
  }
}
