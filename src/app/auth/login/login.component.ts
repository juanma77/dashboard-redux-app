import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// Sweet Alert para manejar alertas de mensaje de error o login exitoso 
import Swal from 'sweetalert2';

//Ngrx 
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IS_LOADING_ACTION, STOP_LOADING_ACTION } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup; 

  public loading: boolean = false; 

  public uiUnsuscription: Subscription

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState> ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({

      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]

    });

    // Cuando hagamos el dispatch de la accion este loading va a cargar o a dejar de cargar 
    this.uiUnsuscription = this.store.select('ui').subscribe( ui =>{

      this.loading = ui.isLoading; 
      console.log('Cargando subscripcion ');
      
      // Imprime "false"
      // console.log( this.loading ); 

    });
    
  }

  // Metodo ejecutado cuando la pagina es destruida; aqui debemos limpiarla, por ejemplo aqui es el lugar ideal para dejar de suscribirnos a las suscripciones que tenemos ; esto ultimo para que no se hagan multiples suscripciones y se desborde memoria 
  ngOnDestroy() {

    this.uiUnsuscription.unsubscribe(); 

  }

  public loginUser() {

    if(this.loginForm.invalid) {
      return; 
    }

    // Hacemos el dispatch de la accion desde el store
    this.store.dispatch( IS_LOADING_ACTION() ); 

    // Mientras cargamos la página mandamos el mensaje de alerta en pantalla 
    /*Swal.fire({
      title: 'Espera por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });*/
    

    const { email, password } = this.loginForm.value; 

    this.authService.checkUserLogin( email, password ).then( credenciales => {

      // Caso exitoso; usuario logrado correctamente
      console.log( credenciales );

      //Swal.close();

      // Antes de que mandemos a la pagina siguiente, disparamos la accion de STOP_LOADING_ACTION
      this.store.dispatch( STOP_LOADING_ACTION() ); 

      // Redireccionamos a la página principal del dashboard
      this.router.navigate(['/']); 

    }).catch( err =>{

      // Tambien disparamos aqui la accion de STOP_LOADING_ACTION
      this.store.dispatch( STOP_LOADING_ACTION() );

      // Caso no exitoso; usuario logeado incorrectamente 
      console.error( err );

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })

    } )
  }

}
