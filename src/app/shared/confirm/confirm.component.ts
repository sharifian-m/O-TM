import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  close(flag?: boolean){
    this.modal.close(flag);

  }

}
