import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Colocamos aquí el Guard para cuando se intente entrar al dashboard sin estar logeado, no sea posible 
import { AuthGuard } from './services/auth.guard';

import ('./income-outcome/income-outcome.module');

const ROUTES: Routes = [

    { path:'login', component: LoginComponent },
    { path:'register', component: RegisterComponent },

    /*{ 
        path:'', component: DashboardComponent,
        children: DASHBOARD_ROUTES,
        canActivate: [ AuthGuard ]
    },*/

    {
        path: '',
        canLoad: [ AuthGuard ],
        loadChildren: () => import('./income-outcome/income-outcome.module').then( module => module.IncomeOutcomeModule )
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

