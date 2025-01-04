import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  form: FormGroup;

  constructor(private authService: UserService, private router: Router) {
    // Inicialización del formulario reactivo
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required])

    });
  }
  submit() {
    if (this.form.valid) {
      const formData = this.form.value;

      this.authService.createAccount(formData).subscribe({
        next: (response) => {
          alert('Account created successfully!');
          this.router.navigate(['/login']); // Redirige al login después de crear la cuenta
        },
        error: (err) => {
          console.error('Account creation failed:', err);
          alert('Failed to create account. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

}
