import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRequiredRoleCodeDialogComponent } from './item-required-role-code-dialog.component';

describe('ItemRequiredRoleCodeDialogComponent', () => {
  let component: ItemRequiredRoleCodeDialogComponent;
  let fixture: ComponentFixture<ItemRequiredRoleCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRequiredRoleCodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRequiredRoleCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
