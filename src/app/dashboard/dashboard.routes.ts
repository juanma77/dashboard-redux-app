import { Routes } from '@angular/router';
import { StatisticsComponent } from '../income-outcome/statistics/statistics.component';
import { IncomeOutcomeComponent } from '../income-outcome/income-outcome.component';
import { DetailComponent } from '../income-outcome/detail/detail.component';

// Estas son rutas hijas que usamos tambien en app-routing.module.ts; por ello no declaramos aquí un NgModule 
export const DASHBOARD_ROUTES: Routes = [

    { path:'', component: StatisticsComponent },
    { path:'income-outcome', component: IncomeOutcomeComponent },
    { path:'detail', component: DetailComponent }

];