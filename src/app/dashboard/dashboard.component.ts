import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IncomeOutcomeService } from '../services/income-outcome.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public unsubscribeUser: Subscription;

  constructor( private store: Store<AppState>, private incomeOutcomeService: IncomeOutcomeService ) { }

  // El pipe permite transformar la data o el Observable (user en este caso); el filter permite establecer una condicion true o false, si es true deja pasar la informacion y si no la bloquea; en este caso si el auth.user es diferente de null deja pasar la info y se ejecuta asi el subscribe
  ngOnInit() {

    this.unsubscribeUser = this.store.select('user').pipe(

      filter( auth => auth.user != null )

    ).subscribe( user => {

      console.log( user );
      
      this.incomeOutcomeService.initIncomesOutcomesListener( user.user.uid );

    } );

  }

  ngOnDestroy() {

    this.unsubscribeUser.unsubscribe();

  }

}
