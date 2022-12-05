import { Component, OnInit } from '@angular/core';
// import {TokenAuth} from '../../../core/services/tokenAuth/TokenAuth';
import {CategoryService} from '../../../core/services/category/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    // private tokenService: TokenAuth,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    // this.tokenService.getAuthToken();
    // this.categoryService.setCategoryItems();
  }
  topMove(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
