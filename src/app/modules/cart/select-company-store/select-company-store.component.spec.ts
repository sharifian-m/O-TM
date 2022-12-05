import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCompanyStoreComponent } from './select-company-store.component';

describe('SelectCompanyStoreComponent', () => {
  let component: SelectCompanyStoreComponent;
  let fixture: ComponentFixture<SelectCompanyStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCompanyStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCompanyStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
