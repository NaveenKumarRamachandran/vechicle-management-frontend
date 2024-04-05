import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Vehicle } from './model/vehicle.model';
import { VehicleService } from '../../shared/service/vehicle.service';
import { LazyLoadEvent, MessageService, SharedModule } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrl: './list-vehicle.component.scss'
})

export class ListVehicleComponent implements OnInit {

  vehicleList!: Vehicle[];

  totalRecords!: number;

  loading: boolean = false;

  selectedVechiles!: Vehicle[];

  vehicleForm!: FormGroup;

  searchKey!: string;

  constructor(private vehicleService: VehicleService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      vin: ['', Validators.required]
    });

    this.loading = true;
  }

  loadVehicleList(event: any) {
    this.loading = true;

    this.vehicleService.getAllVehicle().then((res) => {
      this.vehicleList = res;
      this.totalRecords = res.totalRecords;
      this.loading = false;
    });

  }

  clear() {
    this.searchKey = "";
  }


  onSubmit() {
    if (this.vehicleForm.valid) {
      console.log(this.vehicleForm.value);
    }
  }
  doAction() {

  }

  deleteVehicle(id: string) {
    this.vehicleService.deleteVehicle(id).subscribe(
      {
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle deleted successfully' });
          this.getVehicleList();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vehicle deleted Error' });
        }
      }
    )
  }

  getVehicleList() {
    this.vehicleService.getAllVehicle().then((res) => {
      this.selectedVechiles = res;
    });
  }

  search(event: any) {
    this.vehicleService.getAllVehicle(event).then((res) => {
      this.vehicleList = res;
    });
  }
}