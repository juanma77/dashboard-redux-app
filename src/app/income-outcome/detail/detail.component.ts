import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncomeOutcome } from 'src/app/models/income-outcome.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IncomeOutcomeService } from 'src/app/services/income-outcome.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  public incomesOutcomes: IncomeOutcome [] = []; 

  public unSubscribeIcomeOutcome: Subscription; 

  constructor( private store: Store<AppState>, private incomeOutcomeService: IncomeOutcomeService ) { }

  ngOnInit() {

    this.unSubscribeIcomeOutcome = this.store.select('incomeOutcome').subscribe( incomeOutcomeArray =>{

      this.incomesOutcomes = incomeOutcomeArray.items; 

    } );

  }

  ngOnDestroy() {

    this.unSubscribeIcomeOutcome.unsubscribe(); 

  }

  public deleteIncomeOutcome( uidIitem: string ) {

    // console.log( uidItem );
    
   this.incomeOutcomeService.deleteIncomesOutcomes( uidIitem ).then( item  =>{

    Swal.fire(

      'Item deleted successfully!' , 'success'

    )

   } ).catch( err =>{

    Swal.fire(

      'An error happened while deleting the Item', err.message, 'error'

    )

   } )

  }

}
