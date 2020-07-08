import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IncomeOutcome } from 'src/app/models/income-outcome.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public incomes: number = 0;
  public outcomes: number = 0;

  public totalIncomes: number = 0;
  public totalOutcomes: number = 0;

  constructor( private store: Store<AppState> ) {



  }

  ngOnInit() {

    this.store.select('incomeOutcome').subscribe( incomeOutcomeArray =>{

      this.generateStatistics( incomeOutcomeArray.items ); 


    } );

  }

  public generateStatistics( items: IncomeOutcome[] ) {

    for( const item of items ) {

      if( item.type === 'income' ) {

        this.totalIncomes = this.totalIncomes+ item.amount; 
        this.incomes = this.incomes + 1;

      }else {

        this.totalOutcomes = this.totalOutcomes + item.amount;
        this.outcomes = this.outcomes + 1; 

      }

    }


  }

}
