import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup; 

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({

      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]

    });
    

  }

  public loginUser() {

    if(this.loginForm.invalid) {
      return; 
    }

    const { email, password } = this.loginForm.value; 

    this.authService.checkUserLogin( email, password ).then( credenciales => {

      // Caso exitoso; usuario logrado correctamente
      console.log( credenciales );

      // Redireccionamos a la página principal del dashboard
      this.router.navigate(['/']); 

    }).catch( err =>{

      // Caso no exitoso; usuario logeado incorrectamente 
      console.error( err );
    } )

  }

  
}
