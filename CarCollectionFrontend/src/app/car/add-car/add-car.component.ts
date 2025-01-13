import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Car } from 'src/app/interfaces/car.model';
import { createCar, createCarFailure, createCarSuccess } from 'src/app/store/car/actions/car.actions';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  carForm!: FormGroup;
  photoPreview: string = '';

  constructor(private fb: FormBuilder, private store: Store,
    public dialogRef: MatDialogRef<AddCarComponent>,
    private actions$: Actions
  ) {
    this.carForm = this.createCarForm();
  }
  onPhotoUrlChanged() {
    this.photoPreview = this.carForm.get('photo')?.value; // Obtiene la URL del formulario
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
      annotation: [''],
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
    { brand: 'Maisto' },
    {brand: 'Metal Machines'},
    {brand: 'Majorette'},
    {brand: 'Bburago'},
    {brand: 'Takara Tommy'}
  ];
  onSubmit() {
    if (this.carForm.valid) {
      const newCar: Car = this.carForm.value;
      this.store.dispatch(createCar({ car: newCar }));

      // Escucha acciones de éxito o error
      this.actions$.pipe(
        ofType(createCarSuccess),
        take(1)
      ).subscribe(() => {
        alert('Car created successfully!');
        this.dialogRef.close();
      });

      this.actions$.pipe(
        ofType(createCarFailure),
        take(1)
      ).subscribe(({ error }) => {
        alert('Failed to create car: ' + error.message);
      });
    }
  }

}
