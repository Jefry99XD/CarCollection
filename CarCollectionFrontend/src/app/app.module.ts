import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddCarComponent } from './car/add-car/add-car.component';
import { CarViewComponent } from './car/car-view/car-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { CarComponent } from './car/car.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CarEffects } from './store/car/effects/car.effect';
import { carReducer } from './store/car/reducer/car.reducer';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddCarCsvComponent } from './car/add-car-csv/add-car-csv.component';
import { LoginComponent } from './user/login/login.component';
import { CreateAccountComponent } from './user/create-account/create-account.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NavbarComponent } from './menu/navbar/navbar.component';
import { HomeComponent } from './menu/home/home.component';  // Para la paginación
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersComponent } from './user/users/users.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    AddCarComponent,
    CarViewComponent,
    CarComponent,
    AddCarCsvComponent,
    LoginComponent,
    CreateAccountComponent,
    ProfileComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    UserProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatExpansionModule,
    StoreModule.forRoot({ carState: carReducer }),
    StoreModule.forRoot({ carState: carReducer }),  // Asegúrate de que el reducer esté registrado
    EffectsModule.forRoot([CarEffects]), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
