import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FactorItemService} from 'src/app/core/services/factor-item/factor.service';
import {FactorCrudService} from 'src/app/core/services/factor/factor.service';
import {ShereCustomService} from '../../../../core/services/share-custom/share-custom.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  factorId: any;
  factorNumber: any;
  factorItems: any[] = [];
  fetchFactorWithItem: any = {};
  totalCount = 0;
  orderState: any;
  orderStateList: any[] = [];
  currentUser:any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private factorCrudService: FactorCrudService,
              private factorItemService: FactorItemService,
              private shereCustomService: ShereCustomService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllOrderStateEnumForCombo();
    this.route.queryParams.subscribe(
      (data) => {
        this.factorId = data.factorId;
        this.factorNumber = data.factorNumber;
        this.orderState = data.orderState;
        this.fetchFactorItem();
        this.fetchFactorItem2();
      }
    );

  }

  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }
  getAllOrderStateEnumForCombo() {

    this.spinner.show();
    this.shereCustomService.get('GetAllOrderStateEnumForCombo').subscribe((res: any) => {
        this.orderStateList = res.result;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
  }

  findTitel(value) {

    if (this.orderStateList.length) {

      return this.orderStateList.find(x => +x.value == value).displayText;
    }

  }

  fetchFactorItem2() {

    const data = {
      factorId: this.factorId,
      factorNumber: this.factorNumber,
      customerId: this.currentUser.id

    };
    this.spinner.show();
    this.factorCrudService.post('FetchFactorWithItem', data).subscribe(
      (res: any) => {

        this.fetchFactorWithItem = res.result[0];
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    );
  }

  fetchFactorItem() {
    let params = new HttpParams();
    params = params.set('FactorId', this.factorId);
    this.spinner.show();
    this.factorItemService.get('GetFactorItemByFactorId2', params).subscribe(
      (res: any) => {

        // this.factorState=res.result[0].factorState
        this.factorItems = res.result.items;
        this.spinner.hide();

      }, () => {
        this.spinner.hide();
      }
    );
  }



  goToProductDetail(id ,title) {
    this.router.navigate(['/product-list/product-detail',{id:id , title:title}]);

  }
}
