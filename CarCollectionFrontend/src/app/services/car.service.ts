import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:3000/api/car/addCar';  // Ruta de tu API

  constructor(private http: HttpClient) {}

  // Método para crear un nuevo carro
  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }
}
