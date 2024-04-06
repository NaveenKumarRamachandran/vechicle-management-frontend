import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../../app/vehicle/model/vehicle.model';
import { map } from 'rxjs';

@Injectable()
export class VehicleService {

    baseUrl = "http://localhost:5000/api/v1/vehicle";

    constructor(private http: HttpClient) { }

    getAllVehicle(params?: any): Promise<any> {
        console.log(params);
        let queryParam = "";
        if (params) {
            queryParam = "?key=" + params;
        }
        return this.http.get<any>(this.baseUrl + '/all' + queryParam).toPromise();
    }

    createVehicle(vehicle: Vehicle) {
        return this.http.post<any>(this.baseUrl, { ...vehicle }).pipe(map((res) => res));
    }


    updateVehicle(vehicle: Vehicle) {
        return this.http.put<any>(this.baseUrl, { ...vehicle }).pipe(map((res) => res));
    }

    getVehicle(key: string) {
        return this.http.get<any>(this.baseUrl + '?id=' + key);
    }

    deleteVehicle(id: string) {
        return this.http.delete<any>(this.baseUrl + '?id=' + id);
    }
};