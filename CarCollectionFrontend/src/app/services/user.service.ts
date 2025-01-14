import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + `user`; 

  constructor(private http: HttpClient) {}

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private hasToken(): boolean {
    return localStorage.getItem('token') !== null;
  }
  get isLoggedIn$() {
    return this.loggedInSubject.asObservable();
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      map((response: any) => {
        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userData', JSON.stringify(response.user));
          this.loggedInSubject.next(true);
        }
        return response;
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData'); 
    window.location.href = '/login';
  }
  

  createAccount(data: { username: string; email: string; password: string , photo:string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/createUser`, data);
  }  

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+`/getUsers`);
  }
  editProfile(updatedData: { id: string, username: string; photo: string; password?: string }): Observable<any> {
    const { username, photo, password } = updatedData;
    const dataToUpdate: any = { username, photo };

    if (password) {
      dataToUpdate.password = password; // Solo incluir la contraseña si es que se proporciona
    }

    // Obtener el token de autenticación de localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Configurar los encabezados con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/updateUser/${updatedData.id}`, dataToUpdate, { headers });
  }
  

}
