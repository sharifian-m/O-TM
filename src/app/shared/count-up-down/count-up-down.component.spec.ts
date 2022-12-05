import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountUpDownComponent } from './count-up-down.component';

describe('CountUpDownComponent', () => {
  let component: CountUpDownComponent;
  let fixture: ComponentFixture<CountUpDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountUpDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountUpDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
