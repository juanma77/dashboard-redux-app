import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore'; 
import { IncomeOutcome } from '../models/income-outcome.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeOutcomeService {

  constructor( private firestore: AngularFirestore, private authService: AuthService ) {

  }
 
  // Aqui agregamos una nueva coleccion llamada "items" a la bd de Firestore; con los 3 puntos mandamos todas las propiedades del objeto para no mutarlo; el snapshotChanges lo usamos porque este metodo nos da el ID del documenot y el valueChanges no lo hace; el pipe es para transformar la data que obtenemos con el Observable; el map de ngrx permite tomar la respuesta (el snapshot en este caso o lo que retornamos) y regresar cualquier cosa que queramos en el siguiente paso ; el map de js sirve para barrer o iterar cada uno de los elementos del arreglo y retorna el objeto que pongamos en el return (regresa siempre un arreglo nuevo)
  public createNewIncomeOutcome( incomeOutcome: IncomeOutcome ) {

    const uid = this.authService.getUser.uid; 
    console.log(uid);

    return this.firestore.doc(`${ uid }/income-outcome`).collection('items').add({ ...incomeOutcome });

   

  }

  public initIncomesOutcomesListener( uid: string ) {

    this.firestore.collection(`${ uid }/income-outcome/items`).snapshotChanges().pipe(
      map( snapshot =>{
        return snapshot.map( doc =>{
          const data: any = doc.payload.doc.data();
          return {
            uid: doc.payload.doc.id,
            ...data

          }
          //console.log( doc ); 
        } )
      } )
    )
    .subscribe( incomesOutcomesArray =>{
      console.log( incomesOutcomesArray ); 
    } );
  }

}
