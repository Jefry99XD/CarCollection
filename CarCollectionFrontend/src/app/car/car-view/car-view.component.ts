import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/interfaces/car.model';
import { loadCars } from 'src/app/store/car/actions/car.actions';
import { getAllCars } from 'src/app/store/car/selector/car.selector';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent {
  cars$: Observable<Car[]> = this.store.pipe(select(getAllCars));
  dataSource: MatTableDataSource<Car> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'brand', 'scale', 'manufacturerName', 'manufacturerCountry', 'manufacturerYear', 'year', 'case', 'color', 'photo', 'code', 'tag', 'seriesName', 'seriesNumber', 'annotation'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadCars());  // Despachar la acción para cargar los carros
  }

  ngAfterViewInit(): void {
    // Asignar el paginator al dataSource después de que el view se haya inicializado
    this.cars$.subscribe(cars => {
      this.dataSource.data = cars.map(car => ({
        ...car,
        manufacturerName: car.manufacturer?.name || 'na',
        manufacturerCountry: car.manufacturer?.country || 'na',
        manufacturerYear: car.manufacturer?.year || 'na',
        seriesName: car.series?.name || 'na',
        seriesNumber: car.series?.number || 'na',
        color: car.color || 'na',
        case: car.case || 'na',
        tag: car.tag || 'na',
        photo: car.photo || 'na',
        annotation: car.annotation || 'na'
      }));
      this.dataSource.paginator = this.paginator;  // Asignar el paginator aquí
    });
  }
}
