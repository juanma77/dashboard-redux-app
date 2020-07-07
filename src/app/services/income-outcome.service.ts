import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore'; 
import { IncomeOutcome } from '../models/income-outcome.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeOutcomeService {

  constructor( private firestore: AngularFirestore, private authService: AuthService ) {

  }
 
  // Aqui agregamos una nueva coleccion llamada "items" a la bd de Firestore; con los 3 puntos mandamos todas las propiedades del objeto para no mutarlo 
  public createNewIncomeOutcome( incomeOutcome: IncomeOutcome ) {

    const uid = this.authService.getUser.uid; 
    console.log(uid);

    return this.firestore.doc(`${ uid }/income-outcome`).collection('items').add({ ...incomeOutcome });

   

  }

  public initIncomesOutcomesListener( uid: string ) {

    this.firestore.collection(`${ uid }/income-outcome/items`).valueChanges().subscribe( incomesOutcomesArray =>{

      console.log( incomesOutcomesArray ); 

    } );


  }


}
