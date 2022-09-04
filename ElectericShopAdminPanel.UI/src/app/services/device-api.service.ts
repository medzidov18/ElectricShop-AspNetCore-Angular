import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDevice } from '../models/device';

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

  addDevice(data: any) {
    return this.http.post<IDevice[]>(this.deviceAPIUrl + '/devices', data);
  }

  updateDevice(id: number|string, data: any) {
    return this.http.put<IDevice[]>(this.deviceAPIUrl + `/devices/${id}`, data);
  }

  deleteDevice(id: number|string) {
    return this.http.delete<IDevice[]>(this.deviceAPIUrl + `/devices/${id}`);
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

  //Ram
  getMemoryList(): Observable<any[]> {
    return this.http.get<any>(this.deviceAPIUrl + '/memory');
  }

  addMemory(data: any) {
    return this.http.post<any>(this.deviceAPIUrl + '/memory', data);
  }

  updateMemory(id: number|string, data: any) {
    return this.http.put<any>(this.deviceAPIUrl + `/memory/${id}`, data);
  }

  deleteMemory(id: number|string) {
    return this.http.delete<any>(this.deviceAPIUrl + `/memory/${id}`);
  }

  //Ram
  getRamList(): Observable<any[]> {
    return this.http.get<any>(this.deviceAPIUrl + '/ram');
  }

  addRam(data: any) {
    return this.http.post<any>(this.deviceAPIUrl + '/ram', data);
  }

  updateRam(id: number|string, data: any) {
    return this.http.put<any>(this.deviceAPIUrl + `/ram/${id}`, data);
  }

  deleteRam(id: number|string) {
    return this.http.delete<any>(this.deviceAPIUrl + `/ram/${id}`);
  }
}
