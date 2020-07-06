import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

import 'firebase/firestore'; 

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SET_USER_ACTION, UNSET_USER_ACTION } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public unSuscribeFirebaseDoc: Subscription; 

  private _user: User; 

  constructor( public auth: AngularFireAuth, private firestore: AngularFirestore, private store: Store<AppState> ) { }

  // Creamos un nuevo usuario utilizando el método que nos da Firebase; creamos un nuevo usuario y lo posteamos a la bd de Firebase 
  public createNewUser( nombre: string, email: string, password: string ) {

    // console.log( { nombre, email, password } );

    // Esto regresa una promesa; por eso hacemos el return; pudimos haber puesto  nombre: newUser.nombre; pero usamos la desestructuración del newUser para obtener todas sus propiedades con los tres puntos (...) y de esta forma mandar un objeto en lugar de una instancia de una clase  
    return this.auth.createUserWithEmailAndPassword( email, password ).then( fbUser =>{

      const newUser = new User( fbUser.user.uid, nombre, email );

      return this.firestore.doc(`${ fbUser.user.uid }/usuario`).set( {
        ...newUser
      } );

    } );

  }

  // Verificamos el login del usuario a través de su email y contraseña utilizando el método que nos da Firebase
  public checkUserLogin( email: string, password: string ) {

    return this.auth.signInWithEmailAndPassword( email, password ); 

  }

  // Hacemos sign out para cerrar sesión del usuario 
  public closeUserSession() {

    return this.auth.signOut(); 

  }

  // Para obtener la informacion si el usuario esta logeado o no, y tomar las medidas necesarias para cuando quiere acceder a rutas sin estar logeado; aqui nos suscribimos al authState para ver si existe el usuario en la bd, si sí entonces nos suscribimos al documento de la bd de Firebase y a la accion de SET_USER_ACTION le setteamos el usuario que recuperamos de ahí, si no entonces mandamos llamar la accion de UNSET_USER_ACTION
  public initAuthListener() {

    this.auth.authState.subscribe( fuser =>{

      // Si el usuario existe en la bd
      if( fuser ) {

        this.unSuscribeFirebaseDoc = this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges().subscribe( (firestoreUser: any) =>{ 

          console.log( firestoreUser ); 

          const user = User.getDataFromFirebase( firestoreUser ); 

          // Esto es para usar este user en el income-outcome.service.ts
          this._user = user; 

          console.log(this._user);

          this.store.dispatch( SET_USER_ACTION( { user: user } ) );

        } );

        // Si el usuario no existe en la bd
      } else {

        this._user = null; 
        this.unSuscribeFirebaseDoc.unsubscribe();  
        this.store.dispatch( UNSET_USER_ACTION() );

      }

    } );
  }

  // Esto regresa un Observable que resuelve un usuario de Firebase pero eso no nos sirve, sino que debemos de convertirlo a un boolean para así resolverlo; el pipe es para filtrar y obtener unicamente los datos que necesitamos; este map es diferente al map de js, este permite mutar un objeto, por ejemplo obtenemos aqui un fuser pero lo mutamos y regresamos un boolean; si el fuser es diferente de null regresa un true, si es igual entonces regresa un false 
  public isUserAuth() {

    return this.auth.authState.pipe(
      map( fuser => fuser != null )

    );

  }

  get getUser() {

    return this._user; 

  }

}
