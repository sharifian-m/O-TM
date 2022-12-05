import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFactorComponent } from './pay-factor.component';

describe('PayFactorComponent', () => {
  let component: PayFactorComponent;
  let fixture: ComponentFixture<PayFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayFactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
