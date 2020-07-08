import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncomeOutcome } from 'src/app/models/income-outcome.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  public incomesOutcomes: IncomeOutcome [] = []; 

  public unSubscribeIcomeOutcome: Subscription; 

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {

    this.unSubscribeIcomeOutcome = this.store.select('incomeOutcome').subscribe( incomeOutcomeArray =>{

      this.incomesOutcomes = incomeOutcomeArray.items; 

    } );

  }

  ngOnDestroy() {

    this.unSubscribeIcomeOutcome.unsubscribe(); 

  }

  public deleteIncomeOutcome( uid: string ) {

    console.log( uid ); 

  }

}
