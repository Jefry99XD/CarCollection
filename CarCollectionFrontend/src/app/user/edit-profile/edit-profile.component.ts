import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  editForm!: FormGroup;
  user!: User;
  photoPreview!: string;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private authService: UserService,private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData) as User;
    } else {
      this.user = {
        id: '',
        username: '',
        photo: '',
        friendsCount: 0,
        CarCollectionCount: 0,
        email: '',
        CarCollection: []
      };
    }

    this.initializeForm();
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      username: [this.user.username],
      photo: [this.user.photo],
      password: [''],
    });

    this.photoPreview = this.user.photo;
  }

  updatePhotoPreview(): void {
    const photoControl = this.editForm.get('photo');
    if (photoControl?.valid) {
      this.photoPreview = photoControl.value;
    }
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value;
      updatedData.id = this.user.id;
  
      // Llamar al servicio para actualizar los datos
      this.updateProfile(updatedData);
    } else {
      console.log('Form is invalid');
    }
  }
  
  async updateProfile(updatedData: { id: string, username: string, photo: string, password?: string }): Promise<void> {
    try {
      const response = await firstValueFrom(this.authService.editProfile(updatedData));
      console.log('Profile updated successfully:', response);
  
      // Mostrar un mensaje de éxito con un alert
      alert('Profile updated successfully');
  
      // Después de cerrar la alerta, redirigir al componente profile-info
      this.router.navigate(['/profile-info']);
      
      // Actualizar los datos en localStorage
      localStorage.setItem('userData', JSON.stringify(response.user));
  
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  }
  
  

}
