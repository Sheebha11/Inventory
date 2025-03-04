import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBrandDialogComponent } from './edit-brand-dialog.component';

describe('EditBrandDialogComponent', () => {
  let component: EditBrandDialogComponent;
  let fixture: ComponentFixture<EditBrandDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBrandDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
