import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeOutcomeComponent } from './income-outcome/income-outcome.component';
import { StatisticsComponent } from './income-outcome/statistics/statistics.component';
import { DetailComponent } from './income-outcome/detail/detail.component';

import { AppRoutingModule } from './app-routing.module';

// Formularios Reactivos 
import { ReactiveFormsModule } from '@angular/forms';

// Angular Fire para utilizar Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Ngrx 
import { StoreModule } from '@ngrx/store'; 
import { appReducer } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IncomeOutcomeOrderPipe } from './pipes/income-outcome-order.pipe';

// Ng Charts 
import { ChartsModule } from 'ng2-charts';

// Modulo que tiene el LoginComponent, RegisterComponent y los ReactiveForms
import { AuthModule } from './auth/auth.module';

// Modulo de Shared (Sidebar, Navbar y Footer)
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IncomeOutcomeComponent,
    StatisticsComponent,
    DetailComponent,
    IncomeOutcomeOrderPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducer ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    ChartsModule,
    AuthModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
