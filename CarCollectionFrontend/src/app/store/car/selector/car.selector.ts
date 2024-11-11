import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarState } from '../reducer/car.reducer';

// Seleccionador para obtener el estado de los carros
const getCarState = createFeatureSelector<CarState>('carState');

// Seleccionador para obtener todos los carros
export const getAllCars = createSelector(
  getCarState,
  (state: CarState) => state.cars
);

// Seleccionador para obtener el estado de carga
export const getLoading = createSelector(
  getCarState,
  (state: CarState) => state.loading
);

// Seleccionador para obtener el error, si existe
export const getError = createSelector(
  getCarState,
  (state: CarState) => state.error
);
