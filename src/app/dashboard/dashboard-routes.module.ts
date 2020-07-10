import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DASHBOARD_ROUTES } from './dashboard.routes';
//import { AuthGuard } from '../services/auth.guard';

const rutasHijas: Routes = [

  { 
    path:'', component: DashboardComponent,
    children: DASHBOARD_ROUTES,
    //canActivate: [ AuthGuard ]
  }

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( rutasHijas )
  ],
  exports: [
    RouterModule

  ]
})
export class DashboardRoutesModule { }
