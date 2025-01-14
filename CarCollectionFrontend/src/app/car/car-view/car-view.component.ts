import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/interfaces/car.model';
import { loadCars } from 'src/app/store/car/actions/car.actions';
import { getAllCars } from 'src/app/store/car/selector/car.selector';
import { AddCarComponent } from '../add-car/add-car.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent {
  cars$: Observable<Car[]> = this.store.pipe(select(getAllCars));
  dataSource: MatTableDataSource<Car> = new MatTableDataSource();
  viewMode: 'table' | 'card' = 'table'; 

  // Column keys and display names
  columnDisplayNames: { [key: string]: string } = {
    Name: 'Car Name',
    Brand: 'Car Brand',
    Scale: 'Scale',
    manufacturerName: 'Manufacturer Name',
    manufacturerCountry: 'Manufacturer Country',
    manufacturerYear: 'Manufacturer Year',
    Year: 'Year',
    Case: 'Case Type',
    Color: 'Car Color',
    Photo: 'Photo URL',
    Code: 'Car Code',
    Tag: 'Tag',
    seriesName: 'Series Name',
    seriesNumber: 'Series Number',
    Annotation: 'Annotation'
  };

  allColumns: string[] = Object.keys(this.columnDisplayNames);
  columnVisibility: { [key: string]: boolean } = this.allColumns.reduce(
    (acc, column) => ({ ...acc, [column]: true }),
    {}
  );
  displayedColumns: string[] = [...this.allColumns];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store, public dialog: MatDialog) {}
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

  openAddCarDialog(): void {
    const dialogRef = this.dialog.open(AddCarComponent, {
      width: '800px',  // Ajusta el tamaño según lo necesites
    });

    dialogRef.afterClosed().subscribe(result => {
        // Recargar los carros al cerrar el modal exitosamente
        this.store.dispatch(loadCars());  // Actualizar la lista de carros
      
    });
  }

  toggleColumnVisibility(column: string): void {
    this.columnVisibility[column] = !this.columnVisibility[column];
    this.updateDisplayedColumns();
  }

  updateDisplayedColumns(): void {
    this.displayedColumns = Object.keys(this.columnVisibility).filter(
      column => this.columnVisibility[column]
    );
  }
  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'table' ? 'card' : 'table';  // Alternar entre tabla y tarjeta
  }
  

}
