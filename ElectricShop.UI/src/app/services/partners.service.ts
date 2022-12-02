import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IPartner } from '../Models/partner';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  readonly deviceAPIUrl = "https://localhost:7163/api";

  constructor(private http: HttpClient) { }

  getPartners(): Observable<IPartner[]>  {
    return this.http.get<IPartner[]>(this.deviceAPIUrl + 'Partners');
  }
}
