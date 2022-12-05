import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SupplierPolicyService} from '../../../core/services/supplier-policy/supplier-policy.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SupplierItemCrudService} from '../../../core/services/supplier-item-crud/supplier-item-crud.service';
import {CustomerBrandsService} from '../../../core/services/customer-brands-crud/customer-brands.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {
  supplierInfo: any;
  model: any;
  supplierItems: any;
  totalItems: number;
  q = 1;
  brands: any;

  constructor(private route: ActivatedRoute,
              private supplierPolicyService: SupplierPolicyService,
              private supplierItemCrudService: SupplierItemCrudService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private customerBrandService: CustomerBrandsService) {
  }

  ngOnInit(): void {
  this.getSupplierInfo();
  this.getSupplierItems();
  this.getBrands();
  }


  getSupplierInfo() {
    let params = new HttpParams();
    params = params.set('customerId', this.route.snapshot.params.id);
    this.supplierPolicyService.get('GetSupplierPolicyByCustometId', params).subscribe((res: any) => {
      this.supplierInfo = res.result;
    });
  }
  getSupplierItems() {
    this.spinner.show();
    let params = new HttpParams();
    const skipCount = 16 * (this.q - 1);
    params = params.set('SupplierId', this.route.snapshot.params.id).set('maxResultCount', '16').set('skipCount', skipCount.toString());
    this.supplierItemCrudService.get('GetSupplierItems', params).subscribe(
      (res: any) => {
        this.model = res.result;
        this.supplierItems = res.result.items;
        this.totalItems = res.result.totalCount;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );

  }
  getBrands() {
    this.spinner.show();
    let params = new HttpParams();
    const skipCount = 16 * (this.q - 1);
    params = params.set('customerId', this.route.snapshot.params.id).set('maxResultCount', '16').set('skipCount', skipCount.toString());
    this.customerBrandService.get('GetCustomerBrandsByCustomerId', params).subscribe(
      (res: any) => {
        this.brands = res.result.items;
        this.totalItems = res.result.totalCount;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );

  }
  pageChanged(event) {
    this.q = event;
    this.getSupplierItems();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getNumberWithComma(value) {
    value = String(value);
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  }

  productDetail(id) {
    this.router.navigate(['product-list/product-detail', id]);
  }
}
