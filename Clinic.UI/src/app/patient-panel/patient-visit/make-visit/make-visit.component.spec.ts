import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeVisitComponent } from './make-visit.component';

describe('MakeVisitComponent', () => {
  let component: MakeVisitComponent;
  let fixture: ComponentFixture<MakeVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
