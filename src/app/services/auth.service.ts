import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth ) { }


  public createNewUser( nombre: string, email: string, password: string ) {

    // console.log( { nombre, email, password } );

    // Esto regresa una promesa; por eso hacemos el return 
    return this.auth.createUserWithEmailAndPassword( email, password ); 

  }
}
