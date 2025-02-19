import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 private PASSWORD_KEY = 'auth_lonely_password';

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const savedPassword = localStorage.getItem(this.PASSWORD_KEY);

    // Si ya ingresó la contraseña correctamente antes, permitir el acceso
    if (savedPassword === 'zorroybufon33') {
      return true;
    }

    // Si no ha ingresado, pedir la contraseña
    const password = prompt('Ingresa contraseña');
    
    if (password === 'zorroybufon33') {
      localStorage.setItem(this.PASSWORD_KEY, password);  // Guardar en localStorage
      return true;
    } else {
      alert('Incorrecto. No puedes acceder');
      this.router.navigate(['/']);  // Redirigir al inicio
      return false;
    }
  }
  
}
