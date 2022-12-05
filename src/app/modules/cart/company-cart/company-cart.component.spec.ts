import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCartComponent } from './company-cart.component';

describe('CompanyCartComponent', () => {
  let component: CompanyCartComponent;
  let fixture: ComponentFixture<CompanyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
