import { Pipe, PipeTransform } from '@angular/core';
import { IncomeOutcome } from '../models/income-outcome.model';

@Pipe({
  name: 'incomeOutcomeOrder'
})
export class IncomeOutcomeOrderPipe implements PipeTransform {

  // El sort es para odenar el arreglo de acuerdo a si el a.type es income o no
  transform(items: IncomeOutcome[]): IncomeOutcome[] {
  
    return items.sort( ( a, b ) => {

      if( a.type === 'income' ) {
        
        return -1;

      }else {

        return 1; 

      }


    });


  }

}
