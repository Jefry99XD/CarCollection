import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Car } from 'src/app/interfaces/car.model';
import { createCar, createCarSuccess, createCarFailure } from '../actions/car.actions';

@Injectable()
export class CarEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store
  ) {}

  createCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCar),
      mergeMap((action) =>
        this.carService.createCar(action.car).pipe(
          map((newCar) => createCarSuccess({ car: newCar })),
          catchError((error) => of(createCarFailure({ error: error.message })))
        )
      )
    )
  );
}
