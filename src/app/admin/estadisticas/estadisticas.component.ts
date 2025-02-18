import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { BrinderService } from 'src/app/shared/services/brinder.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  matches: any[] = [];
  personajeStats: any[] = [];
  totalMatches: number = 0;
  @ViewChild('chart') private chartContainer: ElementRef | undefined;
  utils: Utils;

  constructor(private brinderService: BrinderService, private router: Router) {
    this.utils = new Utils(this.router);
  }

  ngOnInit(): void {
    this.cargarMatches();
  }

  cargarMatches(): void {
    this.brinderService.obtenerMatches().subscribe((data) => {
      this.matches = data.sort((a, b) =>
        a.personaje1_name.localeCompare(b.personaje1_name)
      ); // Orden alfabético
      this.matches = this.matches.filter((match) => match.tipo === 'brinder');
      this.totalMatches = this.matches.length; // Total de matches
      this.generarGrafico();
      this.calcularEstadisticasPersonajes();
    });
  }

  generarGrafico(): void {
    const personajeCounts: { [key: string]: number } = {};

    // Contar los matches por personaje
    this.matches.forEach((match) => {
      personajeCounts[match.personaje1_name] =
        (personajeCounts[match.personaje1_name] || 0) + 1;
      personajeCounts[match.personaje2_name] =
        (personajeCounts[match.personaje2_name] || 0) + 1;
    });

    const personajes = Object.keys(personajeCounts);
    const counts = personajes.map((personaje) => personajeCounts[personaje]);

    // Crear el gráfico de barras con D3
    const svg = d3
      .select(this.chartContainer?.nativeElement)
      .append('svg')
      .attr('width', 600)
      .attr('height', 400);

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand().domain(personajes).range([0, width]).padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(counts) || 0])
      .nice()
      .range([height, 0]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll('.bar')
      .data(counts)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(personajes[i]) || 0)
      .attr('y', (d) => y(d))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d));

    g.append('g')
      .selectAll('.x-axis')
      .data([personajes])
      .enter()
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g').call(d3.axisLeft(y));
  }

  calcularEstadisticasPersonajes(): void {
    const personajeCounts: { [key: string]: number } = {};

    // Contar los matches por personaje
    this.matches.forEach((match) => {
      personajeCounts[match.personaje1_name] =
        (personajeCounts[match.personaje1_name] || 0) + 1;
      personajeCounts[match.personaje2_name] =
        (personajeCounts[match.personaje2_name] || 0) + 1;
    });

    // Crear un array con las estadísticas de cada personaje
    this.personajeStats = Object.keys(personajeCounts).map((personaje) => {
      const count = personajeCounts[personaje];
      const porcentaje = (count / this.totalMatches) * 100;
      return {
        personaje,
        matches: count,
        porcentaje: porcentaje.toFixed(2),
      };
    });

    // Ordenar personajes por cantidad de matches (descendente)
    this.personajeStats.sort((a, b) => b.matches - a.matches);
  }

  navegar(ruta: string) {
    this.utils.navegar(ruta);
  }
}
