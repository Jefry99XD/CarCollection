import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:3000/api/car/';  // Ruta de tu API

  constructor(private http: HttpClient) {}
  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl + `addCar`, car);
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl + `getCars`);
  }
  uploadCsv(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl + 'uploadCsv', formData);
  }
}
