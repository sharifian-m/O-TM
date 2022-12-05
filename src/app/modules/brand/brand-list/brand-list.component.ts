import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {BrandCrudService} from 'src/app/core/services/brand-crud/brand.service';
import {ToastrService} from 'ngx-toastr';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {of, Observable} from 'rxjs';


@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  brandList: any[] = [];
  q = 1;
  totalCount: number;
  brandListSearch: any[] = [];
  brandListSearchAll: any[] = [];
  brandlist$: Observable<any>[] = [];
  searchGroup: UntypedFormGroup;

  constructor(private brandCrudService: BrandCrudService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private fb: UntypedFormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    window.scrollTo(0, 0);

    this.getAllBrands();
  }

  initForm() {
    this.searchGroup = this.fb.group(
      {
        searchInput: ['']
      }
    );
    this.searchBrand();
  }

  getAllBrands() {

    let params = new HttpParams();
    // tslint:disable-next-line:triple-equals
    const skipCount = 30 * (this.q - 1);
    params = params.set('maxResultCount', '30').set('skipCount', skipCount.toString());
    this.spinner.show();

    this.brandCrudService.get('GetAll', params).subscribe(
      (res: any) => {
        this.totalCount = res.result.totalCount;
        this.brandList = res.result.items;
        this.brandListSearchAll = res.result.items;
        this.spinner.hide();

      }, () => {
        this.spinner.hide();
        this.toastr.error('خطا در دریافت اطلاعات');
      }
    );
  }

  getBrands(title: string = ''): any {

    let params = new HttpParams();
    if (title !== '') {
      params = params.set('title', title).set('maxResultCount', '30').set('skipCount', '0');

    } else {
      params = params.set('maxResultCount', '30').set('skipCount', '0');

    }
    this.spinner.show();
    this.brandCrudService.get('GetAll', params).subscribe(
      (res: any) => {
        this.totalCount = res.result.totalCount;
        this.brandList = res.result.items;

        this.spinner.hide();

      }, () => {
        this.spinner.hide();
        this.toastr.error('خطا در دریافت اطلاعات');
      }
    );
  }

  brandDetail(id) {
    this.router.navigate(['/brand/brand-detail', id]);
  }

  pageChanged(event) {
    this.q = event;
    this.getAllBrands();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  searchBrand() {
    this.searchGroup.valueChanges.pipe(
      debounceTime(600),
      map(form => form.searchInput),
      distinctUntilChanged(),
      // filter(term => term.length >= 2),
      tap(() => {
        this.q = 1;
      }),
      switchMap((search) =>
        of(this.getBrands(search))
      ),
    ).subscribe();
  }
}
