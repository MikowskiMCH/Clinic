import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfoDialogComponent } from './patient-info-dialog.component';

describe('PatientInfoDialogComponent', () => {
  let component: PatientInfoDialogComponent;
  let fixture: ComponentFixture<PatientInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
