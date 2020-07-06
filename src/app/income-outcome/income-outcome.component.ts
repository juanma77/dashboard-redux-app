import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncomeOutcomeService } from '../services/income-outcome.service';
import { IncomeOutcome } from '../models/income-outcome.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-income-outcome',
  templateUrl: './income-outcome.component.html',
  styleUrls: ['./income-outcome.component.css']
})
export class IncomeOutcomeComponent implements OnInit {

  public incomeForm: FormGroup; 
  
  public type: string = 'income'; 

  constructor( private fb: FormBuilder, private incomeOutcomeService: IncomeOutcomeService ) { }

  ngOnInit() {

    this.incomeForm = this.fb.group({

      description : [ '', Validators.required ],
      amount : [ '', Validators.required ]

    });

  }

  public saveIncome() {

    if( this.incomeForm.invalid ) {

      return; 

    }

    /*console.log( this.incomeForm.value );
    console.log( this.type );
    */

    const { description, amount  } = this.incomeForm.value;

    const incomeOutcome = new IncomeOutcome( description, amount, this.type );

    this.incomeOutcomeService.createNewIncomeOutcome( incomeOutcome ).then( (res) =>{

      console.log( 'Income/Outcome added successfully!', res);

      this.incomeForm.reset();
      Swal.fire('Ingreso/Egreso creado exitosamente', description, 'success'); 

    } ).catch( (err) =>{

      console.warn( 'An error happened while adding new Income/Outcome', err );

      Swal.fire('Error al crear el Ingreso/Egreso', err.message, 'error');

    })



  }

}
