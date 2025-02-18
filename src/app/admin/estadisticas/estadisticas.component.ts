import { Component, OnInit } from '@angular/core';
import { BrinderService } from 'src/app/shared/services/brinder.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  matches: any[] = [];

  // Datos para los gráficos
  personajes: any[] = [];
  brindesPorPersonaje: any[] = [];
  mensajesPorPersonaje: any[] = [];

  // Opciones de los gráficos
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Personaje';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';


  constructor(private brinderService: BrinderService) {}

  ngOnInit(): void {
    this.cargarMatches();
  }

  cargarMatches(): void {
    this.brinderService.obtenerMatches().subscribe((data) => {
      this.matches = data.sort((a, b) => a.personaje1_name.localeCompare(b.personaje1_name));
      this.matches = this.matches.filter((match) => match.tipo === 'brinder');

      this.procesarDatosParaGraficos();
    });
  }

  procesarDatosParaGraficos() {
  }

}