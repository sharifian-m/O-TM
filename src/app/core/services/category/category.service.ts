import {Injectable, Injector} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ICategory} from '../../../models/category-interface';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends HttpService {
  isCategoryMenu = false;
  categories: any;

  constructor(public injector: Injector) {
    super(injector, 'Category');
  }


  async setCategoryItems() {
    await this.http.get(`${environment.baseUrl}Category/GetCategoriesMenu`).subscribe((res: any) => {
        window.localStorage.setItem('megaMenu', JSON.stringify(res.result));
        this.isCategoryMenu = true;
      }
    );
  }

  getCategoryItems(): any {
    this.setCategoryItems();
    return JSON.parse(window.localStorage.getItem('megaMenu'));

  }


}
