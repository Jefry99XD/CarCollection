import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './car/add-car/add-car.component';
import { CarViewComponent } from './car/car-view/car-view.component';
import { CarComponent } from './car/car.component';
import { AddCarCsvComponent } from './car/add-car-csv/add-car-csv.component';

const routes: Routes = [
  { path: '', redirectTo: '/car', pathMatch: 'full' },  // Redirige a car como ruta por defecto
  { path: 'car', component: CarComponent },  // Ruta para CarComponent
  { path: 'car-view', component: CarViewComponent },
  { path: 'add-car', component: AddCarComponent },
  {path: 'add-car-csv', component: AddCarCsvComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 


}
