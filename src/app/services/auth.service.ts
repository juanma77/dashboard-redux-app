import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

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

}
