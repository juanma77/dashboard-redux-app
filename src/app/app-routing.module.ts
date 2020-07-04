import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Rutas hijas 
import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';

// Colocamos aquí el Guard para cuando se intente entrar al dashboard sin estar logeado, no sea posible 
const ROUTES: Routes = [

    { path:'login', component: LoginComponent },
    { path:'register', component: RegisterComponent },
    { 
        path:'', component: DashboardComponent,
        children: DASHBOARD_ROUTES,
        canActivate: [ AuthGuard ]
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

