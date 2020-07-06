import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-income-outcome',
  templateUrl: './income-outcome.component.html',
  styleUrls: ['./income-outcome.component.css']
})
export class IncomeOutcomeComponent implements OnInit {

  public incomeForm: FormGroup; 
  
  public type: string = 'income'; 

  constructor( private fb: FormBuilder ) { }

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

    console.log( this.incomeForm.value );
    console.log( this.type );

  }

}
