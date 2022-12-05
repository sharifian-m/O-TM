import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-btn-cart',
  templateUrl: './btn-cart.component.html',
  styleUrls: ['./btn-cart.component.scss']
})
export class BtnCartComponent implements OnInit {
  constructor() { }
  @Input('BtnName') btnName = 'افزودن به سبد خرید';
  ngOnInit(): void {
  }

}
