import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPrescriptionsDialogComponent } from './patient-prescriptions-dialog.component';

describe('PatientPrescriptionsDialogComponent', () => {
  let component: PatientPrescriptionsDialogComponent;
  let fixture: ComponentFixture<PatientPrescriptionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPrescriptionsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPrescriptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
