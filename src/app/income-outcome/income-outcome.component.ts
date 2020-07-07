import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncomeOutcomeService } from '../services/income-outcome.service';
import { IncomeOutcome } from '../models/income-outcome.model';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { IS_LOADING_ACTION, STOP_LOADING_ACTION } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-outcome',
  templateUrl: './income-outcome.component.html',
  styleUrls: ['./income-outcome.component.css']
})
export class IncomeOutcomeComponent implements OnInit, OnDestroy {

  public incomeForm: FormGroup; 
  
  public type: string = 'income'; 

  public loading: boolean = false; 

  public loadingUnSubscription: Subscription; 

  constructor( private fb: FormBuilder, private incomeOutcomeService: IncomeOutcomeService, private store:Store<AppState> ) { }

  ngOnInit() {

    this.loadingUnSubscription = this.store.select('ui').subscribe( ui =>{

      this.loading = ui.isLoading; 

    } );

    this.incomeForm = this.fb.group({

      description : [ '', Validators.required ],
      amount : [ '', Validators.required ]

    });

  }

  ngOnDestroy() {

    this.loadingUnSubscription.unsubscribe(); 

  }

  public saveIncome() {

    if( this.incomeForm.invalid ) {

      return; 

    }

    this.store.dispatch( IS_LOADING_ACTION() );

    /*console.log( this.incomeForm.value );
    console.log( this.type );
    */

    const { description, amount  } = this.incomeForm.value;

    const incomeOutcome = new IncomeOutcome( description, amount, this.type );

    this.incomeOutcomeService.createNewIncomeOutcome( incomeOutcome ).then( (res) =>{

      console.log( 'Income/Outcome added successfully!', res);

      this.incomeForm.reset();

      this.store.dispatch( STOP_LOADING_ACTION() );

      Swal.fire('Ingreso/Egreso creado exitosamente', description, 'success'); 

    } ).catch( (err) =>{

      console.warn( 'An error happened while adding new Income/Outcome', err );

      this.store.dispatch( STOP_LOADING_ACTION() );

      Swal.fire('Error al crear el Ingreso/Egreso', err.message, 'error');

    })



  }

}
