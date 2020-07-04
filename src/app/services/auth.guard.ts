import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// Lo que hace un Guard es que protege determinadas rutas para que el usuario no entre en ellas si no se cumple la condición de canActivate; se puede leer de la siguiente manera: Retorna un Observable que resuelve un booleano; una Promesa que resuelve un booleano, etc.
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router ){

  }

  canActivate(): Observable<boolean> {
    
    // Debe ser true para que permita el paso al usuario a la ruta, o bien false para no dejarlo pasar; el tap es para disparar un efecto secundario; recibimos un valor booleano llamado estado, si el estado es falso entonces navegamos a la página de login (hacemos un redireccionamiento)
    return this.authService.isUserAuth().pipe(
      tap( estado => {
         if( !estado ) {
           this.router.navigate(['/login']);
         } 
      })

    );
  }
  
}
