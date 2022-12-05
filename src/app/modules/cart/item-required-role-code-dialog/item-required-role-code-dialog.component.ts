import {Component, Inject, Injector, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-item-required-role-code-dialog',
  templateUrl: './item-required-role-code-dialog.component.html',
  styleUrls: ['./item-required-role-code-dialog.component.scss']
})
export class ItemRequiredRoleCodeDialogComponent implements OnInit {

  items :any;
  constructor(
    @Inject(Injector) protected injector: Injector,
    private modal: NgbActiveModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
  ) { }
  protected get http(): HttpClient {
    return this.injector.get(HttpClient);
  }
  ngOnInit(): void {





  }

  goToEditProfile(){
    this.modal.dismiss();
    this.router.navigate(['../user-panel/edit-profile']);
  }
  // tslint:disable-next-line:typedef
  close() {
    // this.modal.close();
    this.modal.dismiss();
  }

}
