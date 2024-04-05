import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { VehicleService } from '../shared/service/vehicle.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appConfig } from './app.config';
import { SharedModule } from '../shared/shared.module';
import { CreateVehicleComponent } from './vehicle-management-create/create-vehicle.component';
import { ListVehicleComponent } from './vehicle/list-vehicle.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    ListVehicleComponent,
    CreateVehicleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'list-vehicle', component: ListVehicleComponent, pathMatch: "full", },
      { path: 'vehicle/:id', component: CreateVehicleComponent, pathMatch: 'full' },
      { path: 'create-vehicle', component: CreateVehicleComponent, pathMatch: 'full' },
    ])
  ],
  providers: [VehicleService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
