import { createReducer, on } from '@ngrx/store';
import { Car } from 'src/app/interfaces/car.model';
import { createCar, createCarFailure, createCarSuccess } from '../actions/car.actions';

export interface CarState {
  car: Car | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CarState = {
  car: null,
  loading: false,
  error: null
};

export const carReducer = createReducer(
  initialState,
  on(createCar, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(createCarSuccess, (state, { car }) => ({
    ...state,
    loading: false,
    car
  })),
  on(createCarFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message
  }))
);
