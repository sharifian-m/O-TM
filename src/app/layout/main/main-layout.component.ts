// import {ThrowStmt} from '@angular/compiler';
import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {GeneralService} from 'src/app/core/services/general/general.service';
import { HomePageService } from 'src/app/core/services/home/home.service';
import {BreadcrumbService} from 'xng-breadcrumb';
import {CategoryService} from '../../core/services/category/category.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  showTopArrow = false;
  hasBreadCrumb = false;
  isLoadData = false;
 
  sticky = false;
  constructor(private breadcrumbService: BreadcrumbService, public generalService: GeneralService,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
 
  }
        

  topMove() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const scrollTop = $event.target.scrollingElement.scrollTop;
    if (scrollTop >= 20) {
      // this.showTopArrow = true;
      this.sticky=true
    } else {
      // this.showTopArrow = false;
      this.sticky=false;

    }
  }

}
