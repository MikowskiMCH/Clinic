import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPrescriptionDialogComponent } from './patient-prescription-dialog.component';

describe('PatientPrescriptionDialogComponent', () => {
  let component: PatientPrescriptionDialogComponent;
  let fixture: ComponentFixture<PatientPrescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPrescriptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPrescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
