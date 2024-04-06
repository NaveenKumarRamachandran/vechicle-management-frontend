import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../shared/service/vehicle.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrl: './create-vehicle.component.scss'
})
export class CreateVehicleComponent implements OnInit {


  vehicleForm!: FormGroup;
  vehicleId!: string;
  constructor(private fb: FormBuilder,
    private vehicleService: VehicleService,
    private messageService: MessageService,
    private route: ActivatedRoute, 
    private router: Router
  ) {

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.vehicleId = params.get('id') as any;
        this.getVehicle(this.vehicleId);
      
      }

    });
  }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      vin: ['', Validators.required]
    });


  }


  onSubmit() {
    if (this.vehicleForm.valid) {
      console.log(this.vehicleForm.value);
      this.createVehicle()
    }
  }

  createVehicle() {
    
    if (!this.vehicleId) {
      this.vehicleService.createVehicle(this.vehicleForm.value).subscribe(
        {
          next: (res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle created successfully' });
            this.router.navigateByUrl('list-vehicle');
          },
          error: (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vehicle creation error ' });
          }
        }

      );
    } else {
      this.vehicleForm.value.id = this.vehicleId;
      this.vehicleService.updateVehicle(this.vehicleForm.value).subscribe(
        {
          next: (res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle updated successfully' });
            this.router.navigateByUrl('list-vehicle');
          },
          error: (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vehicle updated error ' });
          }
        }

      );
    }
  }

  getVehicle(id: string) {
    this.vehicleService.getVehicle(id).subscribe(
      {
        next: (res: any) => {
          this.vehicleForm.patchValue(res);
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vehicle get error ' });
        }
      }
    )
  }

}
