import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard-redux-app';


  // Llamamos al método initAuthService() aqui ya que necesitamos saber si el usuario esta logeado o no desde que se inicia la aplicacion, y dado que este componente siempre se carga (y además es el primero en hacerlo)aqui entonces mandamos llamar dicho metodo  
  constructor( private authService: AuthService ) {

    this.authService.initAuthListener();

  }

}
