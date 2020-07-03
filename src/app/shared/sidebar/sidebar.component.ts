import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  public logout() {

    // Manejamos la promesa; tratamos su caso exitoso y su caso no exitoso 
    this.authService.closeUserSession().then( () =>{
      
      this.router.navigate(['/login']);

    } ); 

  }

}
