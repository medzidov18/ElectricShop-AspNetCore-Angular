import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  readonly deviceAPIUrl = "https://localhost:7163/api";

  constructor(private http: HttpClient) { }

  //Devices
  getDevicesList(): Observable<any[]> {
    return this.http.get<any>(this.deviceAPIUrl + '/devices');
  }

  addDevice(data: any) {
    return this.http.post<any>(this.deviceAPIUrl + '/devices', data);
  }

  updateDevice(id: number|string, data: any) {
    return this.http.put<any>(this.deviceAPIUrl + `/devices/${id}`, data);
  }

  deleteDevice(id: number|string) {
    return this.http.delete<any>(this.deviceAPIUrl + `/devices/${id}`);
  }

  //Category
  getCategoryList(): Observable<any[]> {
    return this.http.get<any>(this.deviceAPIUrl + '/category');
  }

  addCategory(data: any) {
    return this.http.post<any>(this.deviceAPIUrl + '/category', data);
  }

  updateCategory(id: number|string, data: any) {
    return this.http.put<any>(this.deviceAPIUrl + `/category/${id}`, data);
  }

  deleteCategory(id: number|string) {
    return this.http.delete<any>(this.deviceAPIUrl + `/category/${id}`);
  }
}
