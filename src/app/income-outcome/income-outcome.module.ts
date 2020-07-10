import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeOutcomeComponent } from './income-outcome.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { IncomeOutcomeOrderPipe } from '../pipes/income-outcome-order.pipe';

// Formularios Reactivos 
import { ReactiveFormsModule } from '@angular/forms';

// Ng Charts 
import { ChartsModule } from 'ng2-charts';

// Shared module (footer, sidebar y navbar)
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { StoreModule } from '@ngrx/store';

// Aqui cargamos el incomeOutcomeReducer de manera perezosa (lazy load)
import { incomeOutcomeReducer } from './income-outcome.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeOutcomeComponent,
    StatisticsComponent,
    DetailComponent,
    IncomeOutcomeOrderPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule,
    StoreModule.forFeature( 'incomeOutcome', incomeOutcomeReducer )
  ]
})
export class IncomeOutcomeModule { }
