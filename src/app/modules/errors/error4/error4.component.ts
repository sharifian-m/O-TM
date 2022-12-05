import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error4',
  templateUrl: './error4.component.html',
  styleUrls: ['./error4.component.scss']
})
export class Error4Component implements OnInit {
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  goHome(){
    this.router.navigate(['home']);
  }
}
