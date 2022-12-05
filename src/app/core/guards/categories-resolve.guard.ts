import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve, Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {CategoryService} from '../services/category/category.service';
import {ICategory} from '../../models/category-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolveGuard implements Resolve<any> {
  constructor(private categoryService: CategoryService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // this.categoryService.setCategoryItems();
    // return this.categoryService.getCategoryItems();

  }

}
