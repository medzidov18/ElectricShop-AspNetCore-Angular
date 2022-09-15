import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDevice } from '../Models/device';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

    readonly deviceAPIUrl = "https://localhost:7163/api";
    
    constructor(private http: HttpClient) { }

    getDevicesListWithOneCategory(categoryId: number|string): Observable<IDevice[]> {
        return this.http.get<IDevice[]>(this.deviceAPIUrl + `/devicesFilter/filterByCategory/${categoryId}`);
    }

    
}
