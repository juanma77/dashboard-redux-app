import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IncomeOutcome } from 'src/app/models/income-outcome.model';

// Ng Charts 
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { AppStateWithIncome } from '../income-outcome.reducer';

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

  public doughnutChartLabels: Label[] = ['Incomes', 'Outcomes'];
  public doughnutChartData: MultiDataSet = [
    [],
   
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor( private store: Store<AppStateWithIncome> ) {

  }

  ngOnInit() {

    this.store.select('incomeOutcome').subscribe( incomeOutcomeArray =>{

      this.generateStatistics( incomeOutcomeArray.items ); 


    } );

  }

  public generateStatistics( items: IncomeOutcome[] ) {

    this.totalIncomes = 0;
    this.totalOutcomes = 0;
    this.incomes = 0;
    this.outcomes = 0; 

    for( const item of items ) {

      if( item.type === 'income' ) {

        this.totalIncomes = this.totalIncomes+ item.amount; 
        this.incomes = this.incomes + 1;

      }else {

        this.totalOutcomes = this.totalOutcomes + item.amount;
        this.outcomes = this.outcomes + 1; 

      }

    }

   // Para pasar la data a la grafica  
   this.doughnutChartData = [ [this.totalIncomes, this.totalOutcomes] ]; 


  }

}
