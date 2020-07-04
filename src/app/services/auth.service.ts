import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth ) { }

  // Creamos un nuevo usuario utilizando el método que nos da Firebase
  public createNewUser( nombre: string, email: string, password: string ) {

    // console.log( { nombre, email, password } );

    // Esto regresa una promesa; por eso hacemos el return 
    return this.auth.createUserWithEmailAndPassword( email, password ); 

  }

  // Verificamos el login del usuario a través de su email y contraseña utilizando el método que nos da Firebase
  public checkUserLogin( email: string, password: string ) {

    return this.auth.signInWithEmailAndPassword( email, password ); 

  }

  // Hacemos sign out para cerrar sesión del usuario 
  public closeUserSession() {

    return this.auth.signOut(); 

  }

  // Para obtener la informacion si el usuario esta logeado o no, y tomar las medidas necesarias para cuando quiere acceder a rutas sin estar logeado 
  public initAuthListener() {

    this.auth.authState.subscribe( fuser =>{

      console.log( fuser ); 
      //console.log( fuser?.uid );
      //console.log( fuser?.email );

    } );

  }

  // Esto regresa un Observable que resuelve un usuario de Firebase pero eso no nos sirve, sino que debemos de convertirlo a un boolean para así resolverlo; el pipe es para filtrar y obtener unicamente los datos que necesitamos; este map es diferente al map de js, este permite mutar un objeto, por ejemplo obtenemos aqui un fuser pero lo mutamos y regresamos un boolean; si el fuser es diferente de null regresa un true, si es igual entonces regresa un false 
  public isUserAuth() {

    return this.auth.authState.pipe(
      map( fuser => fuser != null )

    );

  }

}
