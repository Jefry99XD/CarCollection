import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-car-csv',
  templateUrl: './add-car-csv.component.html',
  styleUrls: ['./add-car-csv.component.css']
})
export class AddCarCsvComponent {
  selectedFile: File | null = null;  // Archivo seleccionado

  constructor(private carService: CarService) {}

  // Maneja la selección del archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  // Llama al servicio para enviar el archivo
  onFileSubmit(event?: Event): void {
    if (event) {
      event.preventDefault(); // Esto previene la recarga de la página
    }
  
    if (!this.selectedFile) {
      alert('Por favor selecciona un archivo primero.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.carService.uploadCsv(formData).subscribe(
      response => {
        console.log('Archivo subido con éxito', response);
        alert('Archivo subido correctamente');
      },
      error => {
        console.error('Error al subir el archivo', error);
        alert('Hubo un error al subir el archivo');
      }
    );
  }
  
}
