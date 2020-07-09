import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public userName: string = '';
  public unSubscribeUserName: Subscription; 

  constructor( private authService: AuthService, private router: Router, private store: Store<AppState> ) { }

  // Con el filter dejamos pasar el user si este es diferente de null, el pipe debe de ir para poder aplicar dicho filtro u otros tambien 
  ngOnInit() {

    this.unSubscribeUserName = this.store.select('user').pipe(

      filter( ({ user }) => user != null )

    ).subscribe( ({ user })  =>{

      this.userName = user.name; 
      
    });

   
   

  }

  ngOnDestroy() {

    this.unSubscribeUserName.unsubscribe(); 

  }

  public logout() {

    // Manejamos la promesa; tratamos su caso exitoso y su caso no exitoso 
    this.authService.closeUserSession().then( () =>{
      
      this.router.navigate(['/login']);

    } ); 

  }

}
