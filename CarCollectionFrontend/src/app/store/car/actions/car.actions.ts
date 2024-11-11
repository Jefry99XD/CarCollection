import { createAction, props } from '@ngrx/store';
import { Car } from 'src/app/interfaces/car.model';

export const createCar = createAction(
  '[Car] Create Car',
  props<{ car: Car }>()
);

export const createCarSuccess = createAction(
  '[Car] Create Car Success',
  props<{ car: Car }>()
);

export const createCarFailure = createAction(
  '[Car] Create Car Failure',
  props<{ error: any }>()
);

export const loadCars = createAction('[Car] Load Cars');

export const loadCarsSuccess = createAction(
  '[Car] Load Cars Success',
  props<{ cars: Car[] }>()
);

export const loadCarsFailure = createAction(
  '[Car] Load Cars Failure',
  props<{ error: string }>()
);
