import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { AddCarCsvComponent } from './car/add-car-csv/add-car-csv.component';  // Para la paginación




@NgModule({
  declarations: [
    AppComponent,
    AddCarComponent,
    CarViewComponent,
    CarComponent,
    AddCarCsvComponent
  ],
  imports: [
    BrowserModule,
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
    MatExpansionModule,
    StoreModule.forRoot({ carState: carReducer }),
    StoreModule.forRoot({ carState: carReducer }),  // Asegúrate de que el reducer esté registrado
    EffectsModule.forRoot([CarEffects]), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
