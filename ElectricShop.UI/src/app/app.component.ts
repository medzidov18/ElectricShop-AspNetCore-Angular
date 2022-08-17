import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceApiService } from './device-api.service';
import { IDevice } from './Models/device';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categoryList$: Observable<any[]>;
  categoryList: any[];

  categoryMap: Map<number, string> = new Map();

  constructor(private service: DeviceApiService) { }
  
  ngOnInit(): void {
    this.categoryList$ = this.service.getCategoryList();
  }
  
}
