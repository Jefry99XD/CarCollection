import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + `user`; 

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      map((response: any) => {
        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userData', JSON.stringify(response.user));
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

}
