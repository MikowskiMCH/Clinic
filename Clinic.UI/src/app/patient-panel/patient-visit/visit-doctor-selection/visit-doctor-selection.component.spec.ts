import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDoctorSelectionComponent } from './visit-doctor-selection.component';

describe('VisitDoctorSelectionComponent', () => {
  let component: VisitDoctorSelectionComponent;
  let fixture: ComponentFixture<VisitDoctorSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitDoctorSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitDoctorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
