import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/car.model';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  createCar(car: Car): Observable<Car> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    const body = { ...car, userId };
    return this.http.post<Car>(`${this.apiUrl}car/addCar`, body);  // Concatenar con el endpoint específico
  }

  getCars(): Observable<Car[]> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    return this.http.post<Car[]>(`${this.apiUrl}car/getCars`, { userId }); // Concatenar con el endpoint específico
  }

  uploadCsv(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}car/uploadCsv`, formData);  // Concatenar con el endpoint específico
  }

  updateCar(carId: string, car: Partial<Car>, userId: string): Observable<Car> {
    const body = { ...car, userId };
    return this.http.put<Car>(`${this.apiUrl}car/updateCar/${carId}`, body);  // Concatenar con el endpoint específico
  }

  private getUserId(): string | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      return user.id; // Devuelve el ID del usuario
    }
    return null;
  }
}
