import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCartListWithCompanyComponent } from './accept-cart-list-with-company.component';

describe('AcceptCartListWithCompanyComponent', () => {
  let component: AcceptCartListWithCompanyComponent;
  let fixture: ComponentFixture<AcceptCartListWithCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptCartListWithCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptCartListWithCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
