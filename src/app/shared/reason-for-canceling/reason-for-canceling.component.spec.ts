import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonForCancelingComponent } from './reason-for-canceling.component';

describe('ReasonForCancelingComponent', () => {
  let component: ReasonForCancelingComponent;
  let fixture: ComponentFixture<ReasonForCancelingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonForCancelingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonForCancelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
