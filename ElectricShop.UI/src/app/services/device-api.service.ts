import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDevice } from '../Models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  readonly deviceAPIUrl = "https://localhost:7163/api";

  constructor(private http: HttpClient) { }

  //Devices
  getDevicesList(): Observable<IDevice[]> {
    return this.http.get<IDevice[]>(this.deviceAPIUrl + '/devices');
  }

  getDevicesListWithOneCategory(categoryId: number|string): Observable<IDevice[]> {
    return this.http.get<IDevice[]>(this.deviceAPIUrl + `/devices/sortedItems/${categoryId}`);
  }
  
  //Category
  getCategoryList(): Observable<any[]> {
    return this.http.get<any>(this.deviceAPIUrl + '/category');
  }

  //Memory
  getMemoryList(): Observable<any[]> {
    return this.http.get<any>(this.deviceAPIUrl + '/memory');
  }

  //Ram
  getRamList(): Observable<any[]> {
    return this.http.get<any>(this.deviceAPIUrl + '/ram');
  }
}
