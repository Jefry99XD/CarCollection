import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private authService: UserService, private router: Router) {
    // Inicialización del formulario reactivo
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]), 
      password: new FormControl('', [Validators.required, Validators.minLength(6)]), 
    });
  }
  submit() {
    if (this.form.valid) {
      const loginData = this.form.value; // Obtiene los datos del formulario

      this.authService.login(loginData).subscribe({
        next: (response) => {
          // Guarda el token en el almacenamiento local
          localStorage.setItem('token', response.token);
          // Redirige a una ruta segura (por ejemplo, el dashboard)
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed. Please check your credentials.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

}
