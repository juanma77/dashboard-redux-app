import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// Sweet Alert para manejar alertas de mensaje de error o login exitoso 
import Swal from 'sweetalert2';

// Ngrx 
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IS_LOADING_ACTION, STOP_LOADING_ACTION } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup; 

  public loading: boolean = false; 

  public uiUnsuscription: Subscription; 

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState> ) { }

  ngOnInit() {

    // Asignamos nuestros campos del formulario para que se validen 
    this.registerForm = this.fb.group({
      name : [ '', Validators.required ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]


    });

    
    this.uiUnsuscription = this.store.select('ui').subscribe( ui =>{

      this.loading = ui.isLoading; 

    } );


  }

  ngOnDestroy() {

    this.uiUnsuscription.unsubscribe();

  }

  // Para crear un nuevo usuario 
  public createUser() {

    /*console.log( this.registerForm );
    console.log( this.registerForm.valid );
    console.log( this.registerForm.value );*/ 

    if( this.registerForm.invalid ) {
      return; 
    }

    this.store.dispatch( IS_LOADING_ACTION() );

    


    /*Swal.fire({
      title: 'Espera por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });*/


    // Dentro de este objeto esta el valor de los 3 campos del formulario 
    // console.log( this.registerForm.value );

    // Desestructuramos el objeto 
    const { name, email, password } = this.registerForm.value; 

    // Como el createNewUser regresa una promesa aquí usamos el "then" para resolverla, es decir, obtener el resultado que nos regresa la promesa una vez que termina de hacer su trabajo y el "catch" para manejar un posible error 
    this.authService.createNewUser( name, email, password ).then( credenciales =>{
      // Caso éxitoso; el usuario se ha registrado de manera correcta  

      //Swal.close();

      this.store.dispatch( STOP_LOADING_ACTION() );

      this.router.navigate(['/']);
      
      console.log( credenciales );


    } ).catch( err => {

      // Caso no exitoso 
      console.error( err );
      
      this.store.dispatch( STOP_LOADING_ACTION() );

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })

    } ); 


  }

  

}
