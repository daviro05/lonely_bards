import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  utils: Utils;
  isMuted: boolean = false;
  audio = new Audio('assets/sounds/roman-music.mp3');

  constructor(private router: Router) {
    this.audio.loop = true;
    this.audio.play();
    this.utils = new Utils(this.router);
  }

  toggleSound() {
    this.isMuted = !this.isMuted;
    this.isMuted ? this.audio.pause() : this.audio.play();
  }

  navegar(ruta: string) {
    this.utils.navegar(ruta);
  }
}
