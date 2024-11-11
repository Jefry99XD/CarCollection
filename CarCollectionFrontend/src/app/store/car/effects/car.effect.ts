import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Car } from 'src/app/interfaces/car.model';
import { createCar, createCarSuccess, createCarFailure, loadCars, loadCarsFailure, loadCarsSuccess } from '../actions/car.actions';
import { CarService } from 'src/app/services/car.service';

@Injectable()
export class CarEffects {
  constructor(
    private actions$: Actions,
    private carService: CarService
  ) {}

  createCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCar),
      mergeMap((action) => {
        console.log('Efecto creado para la acción createCar', action);
        return this.carService.createCar(action.car).pipe(
          map((newCar) => createCarSuccess({ car: newCar })),
          catchError((error) => of(createCarFailure({ error: error.message })))
        );
      })
    )
  );
  loadCars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCars),
      mergeMap(() =>
        this.carService.getCars().pipe(
          map((cars) => loadCarsSuccess({ cars })),
          catchError((error) => of(loadCarsFailure({ error: error.message })))
        )
      )
    )
  );
  
}
