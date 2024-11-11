import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarCsvComponent } from './add-car-csv.component';

describe('AddCarCsvComponent', () => {
  let component: AddCarCsvComponent;
  let fixture: ComponentFixture<AddCarCsvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCarCsvComponent]
    });
    fixture = TestBed.createComponent(AddCarCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
