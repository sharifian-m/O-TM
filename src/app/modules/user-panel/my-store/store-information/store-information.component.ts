import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-store-information',
  templateUrl: './store-information.component.html',
  styleUrls: ['./store-information.component.scss']
})
export class StoreInformationComponent implements OnInit {
  qr: string;
  type: string;
  lat: number;
  lng: number;

  constructor(private modal: NgbActiveModal) {
  }

  ngOnInit(): void {

  }

  close() {
    this.modal.dismiss();
  }
}
