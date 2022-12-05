import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingGuideComponent } from './shopping-guide.component';

describe('ShoppingGuideComponent', () => {
  let component: ShoppingGuideComponent;
  let fixture: ComponentFixture<ShoppingGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
