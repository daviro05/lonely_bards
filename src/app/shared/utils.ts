import { Router } from '@angular/router';

export class Utils {
  constructor(private router: Router) {}

  navegar(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}
