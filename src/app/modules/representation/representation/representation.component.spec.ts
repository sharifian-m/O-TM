import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentationComponent } from './representation.component';

describe('RepresentationComponent', () => {
  let component: RepresentationComponent;
  let fixture: ComponentFixture<RepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
