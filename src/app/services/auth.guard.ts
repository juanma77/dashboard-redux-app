import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// Lo que hace un Guard es que protege determinadas rutas para que el usuario no entre en ellas si no se cumple la condición de canActivate; se puede leer de la siguiente manera: Retorna un Observable que resuelve un booleano; una Promesa que resuelve un booleano, etc.
export class AuthGuard implements CanActivate, CanLoad {

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

  canLoad(): Observable<boolean> {
    
    // Es parecido al canActivate pero mandamos el take(1) para cancelar la subscripcion y pedir el modulo solo 1 vez; sirve para que al tratar de ingresar al income-outcome module no podamos ingresar si no estamos logeados y mas aun, ni siquiere se cargue en la pestaña de Network de devtools
    return this.authService.isUserAuth().pipe(
      tap( estado => {
         if( !estado ) {
           this.router.navigate(['/login']);
         } 
      }),
      take(1)
    );
  }
  
}
