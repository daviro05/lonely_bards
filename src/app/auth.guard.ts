import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Aquí verificamos si la contraseña es correcta
    const password = prompt('Ingresa contraseña');
    
    if (password === 'zorronegro33') {
      return true;  // Si la contraseña es correcta, se permite el acceso
    } else {
      alert('Incorrecto. No puedes acceder');
      this.router.navigate(['/']);  // Redirigimos al inicio o a cualquier otra página
      return false;  // Bloqueamos el acceso
    }
  }
  
}
