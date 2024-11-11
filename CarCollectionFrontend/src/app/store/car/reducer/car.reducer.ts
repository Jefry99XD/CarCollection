import { createReducer, on } from '@ngrx/store';
import { Car } from 'src/app/interfaces/car.model';
import { createCar, createCarFailure, createCarSuccess, loadCars, loadCarsFailure, loadCarsSuccess } from '../actions/car.actions';

export interface CarState {
  cars: Car[];
  car: Car | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CarState = {
  cars: [],
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
  })),
  on(loadCars, (state) => ({ ...state, loading: true })),
  on(loadCarsSuccess, (state, { cars }) => ({
    ...state,
    loading: false,
    cars: cars,
  })),
  on(loadCarsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);


