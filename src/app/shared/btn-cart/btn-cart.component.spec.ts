import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCartComponent } from './btn-cart.component';

describe('BtnCartComponent', () => {
  let component: BtnCartComponent;
  let fixture: ComponentFixture<BtnCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
