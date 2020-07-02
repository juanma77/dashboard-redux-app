import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Rutas hijas 
import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';

const ROUTES: Routes = [

    { path:'login', component: LoginComponent },
    { path:'register', component: RegisterComponent },
    { 
        path:'', component: DashboardComponent,
        children: DASHBOARD_ROUTES
    },
    { path:'**', redirectTo: '' }

];


@NgModule({

    imports: [
        RouterModule.forRoot( ROUTES )
    ],

    exports: [
        RouterModule
    ]

})


export class AppRoutingModule {

}

