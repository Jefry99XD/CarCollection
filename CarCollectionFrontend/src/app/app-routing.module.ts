import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './car/add-car/add-car.component';
import { CarViewComponent } from './car/car-view/car-view.component';
import { CarComponent } from './car/car.component';
import { AddCarCsvComponent } from './car/add-car-csv/add-car-csv.component';
import { HomeComponent } from './menu/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { CreateAccountComponent } from './user/create-account/create-account.component';
import { authGuard } from './auth.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { UsersComponent } from './user/users/users.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'diecastInfo', component: CarComponent, canActivate: [authGuard]}, 
  { path: 'diecastCollection', component: CarViewComponent , canActivate: [authGuard]},
  { path: 'add-car', component: AddCarComponent, canActivate: [authGuard] },
  {path: 'add-car-csv', component: AddCarCsvComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent, canActivate: [authGuard] },
  {path: 'register', component:CreateAccountComponent},
  {path: 'profile-info', component:ProfileComponent},
  {path: 'users', component:UsersComponent},
  {path: 'editProfile', component:EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 


}
