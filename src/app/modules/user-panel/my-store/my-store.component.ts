import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {StoreInformationComponent} from './store-information/store-information.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {ShereCustomService} from '../../../core/services/share-custom/share-custom.service';
import {ItemRequiredRoleCodeDialogComponent} from '../../cart/item-required-role-code-dialog/item-required-role-code-dialog.component';
import {UploadDocumentsComponent} from '../../../shared/upload-documents/upload-documents.component';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.scss']
})
export class MyStoreComponent implements OnInit {
  stores: any[] = [];
  consumerTypes: any[] = [];
  currentUser:any;
  constructor(private authService: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService,
              private shareCustomService: ShereCustomService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  
    this.getStore();
  }
  getCurrentUser(){
    this.authService.$currentUser.subscribe(res=>{
      this.currentUser=res;
    });
  
  }

  getStore() {

        this.spinner.show();
        this.stores = this.currentUser.storeOutputDtos;
        this.spinner.hide();

  }

  goToAddStore() {
    this.router.navigate(['/user-panel/add-store']);
  }

  qrCode(item) {
    const ref = this.modalService.open(StoreInformationComponent, {},);
    ref.componentInstance.type = 'qr';

    ref.componentInstance.qr = item.uniqIndentifier;
  }
  uploadDocuments(item) {
   this.shareCustomService.storeId = item.id;
   this.shareCustomService.marketerUniqIdentifier = item.uniqIndentifier;
    const ref = this.modalService.open(UploadDocumentsComponent,
      {ariaLabelledBy: 'modal-basic-title', size: 'lg', keyboard: false, centered: true, scrollable: true}
    );

    ref.result.then((result) => {
    }, (reason) => {

    });
    // ref.componentInstance.itams = listItemRequiredRoleCode;
  }


  mapShow(item) {
    const ref = this.modalService.open(StoreInformationComponent, { size : 'lg', scrollable: true });
    ref.componentInstance.type = 'map';
    ref.componentInstance.lat = item.lat;
    ref.componentInstance.lng = item.lang;
  }
  getAllConsumerTypes() {
    this.shareCustomService.get('GetAllConsumerTypesEnumForCombo').subscribe(
      (res: any) => {
        this.consumerTypes = res.result;

      }
    );
  }
}
