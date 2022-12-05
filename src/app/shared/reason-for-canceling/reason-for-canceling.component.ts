import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reason-for-canceling',
  templateUrl: './reason-for-canceling.component.html',
  styleUrls: ['./reason-for-canceling.component.scss']
})
export class ReasonForCancelingComponent implements OnInit {

  item: any;
 @Output() isResponseReason = new EventEmitter<boolean>();
  reasonForCanceling: string;
  @Output() description = new EventEmitter<string>();

  constructor(private modal: NgbActiveModal,
    private toastr: ToastrService,) {
  }

  ngOnInit(): void {

  }

  close(flag?: boolean) {
    if (flag) {
      console.log('this.reasonForCanceling',this.reasonForCanceling);
      
      if(this.reasonForCanceling!=='' && this.reasonForCanceling!==undefined ){
        this.description.emit(this.reasonForCanceling);
        this.isResponseReason.emit(flag);
      console.log('this.reasonForCanceling',this.reasonForCanceling);
      this.modal.close(flag);
      }
      else{
        this.toastr.warning('لطفا دلیل لغو خود را مشخص کنید')
      }
      }
     else{
      this.modal.close(flag);
     }
  }

}
