import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChangedComponent } from './price-changed.component';

describe('PriceChangedComponent', () => {
  let component: PriceChangedComponent;
  let fixture: ComponentFixture<PriceChangedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceChangedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
