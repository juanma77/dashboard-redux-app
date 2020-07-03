import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup; 

  constructor( private fb: FormBuilder ) { }

  ngOnInit() {

    // Asignamos nuestros campos del formulario para que se validen 
    this.registerForm = this.fb.group({
      name : [ '', Validators.required ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]


    });

  }

  public createNewUser() {

    console.log( this.registerForm );
    console.log( this.registerForm.valid );
    console.log( this.registerForm.value );


  }

}
