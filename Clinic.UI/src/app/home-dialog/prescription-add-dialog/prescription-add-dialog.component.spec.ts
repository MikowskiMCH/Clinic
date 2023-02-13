import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionAddDialogComponent } from './prescription-add-dialog.component';

describe('PrescriptionAddDialogComponent', () => {
  let component: PrescriptionAddDialogComponent;
  let fixture: ComponentFixture<PrescriptionAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
