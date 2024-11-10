import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Car } from 'src/app/interfaces/car.model';
import { createCar } from 'src/app/store/car/actions/car.actions';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  carForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.carForm = this.createCarForm();
  }


  createCarForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      scale: [''],
      manufacturer: this.fb.group({
        name: ['', Validators.required],
        country: [''],
        year: ['']
      }),
      year: [''],
      case: [''],
      color: [''],
      photo: [''],
      code: [''],
      tag: [''],
      series: this.fb.group({
        name: ['', Validators.required],
        number: ['', Validators.required]
      })
    });
  }
  tags = ['basico', 'sth', 'th', 'premium'];
  scales: string[] = ['1:64', '1:43', '1:18', '1:24', '1:12', '1:50'];
  brands = [
    { brand: 'Hot Wheels' },
    { brand: 'Matchbox' },
    { brand: 'Maisto' }
  ];
  onSubmit() {
    if (this.carForm.valid) {
      const newCar: Car = this.carForm.value;
      this.store.dispatch(createCar({ car: newCar }));
    }
  }

}
