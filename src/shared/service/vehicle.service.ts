import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../../app/vehicle/model/vehicle.model';
import { map } from 'rxjs';

@Injectable()
export class VehicleService {


    constructor(private http: HttpClient) { }

    getAllVehicle(params?: any): Promise<any> {
        console.log(params);
        let queryParam = "";
        if (params) {
            queryParam = "?key=" + params;
        }
        return this.http.get<any>('http://localhost:5000/api/v1/vehicle/all' + queryParam).toPromise();
    }

    createVehicle(vehicle: Vehicle) {
        return this.http.post<any>('http://localhost:5000/api/v1/vehicle', { ...vehicle }).pipe(map((res) => res));
    }


    updateVehicle(vehicle: Vehicle) {
        return this.http.put<any>('http://localhost:5000/api/v1/vehicle', { ...vehicle }).pipe(map((res) => res));
    }

    getVehicle(key: string) {
        return this.http.get<any>('http://localhost:5000/api/v1/vehicle?id=' + key);
    }

    deleteVehicle(id: string) {
        return this.http.delete<any>('http://localhost:5000/api/v1/vehicle?id=' + id);
    }
};