import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorUnpaidComponent } from './factor-unpaid.component';

describe('FactorUnpaidComponent', () => {
  let component: FactorUnpaidComponent;
  let fixture: ComponentFixture<FactorUnpaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorUnpaidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorUnpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
