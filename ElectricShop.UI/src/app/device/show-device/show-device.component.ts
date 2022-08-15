import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceApiService } from 'src/app/device-api.service';
import { IDevice } from './../../Models/device';

@Component({
  selector: 'app-show-device',
  templateUrl: './show-device.component.html',
  styleUrls: ['./show-device.component.css']
})
export class ShowDeviceComponent implements OnInit {
  @Input() device: IDevice
  constructor(private service: DeviceApiService) { }

  categoryList: any[];
  categoryMap: Map<number, string> = new Map();


  ngOnInit(): void {
    this.refreshCategoryMap();
  }

  details = false
  refreshCategoryMap() {
    this.service.getCategoryList().subscribe(data => {
        this.categoryList = data;

        for (let i = 0; i < data.length; i++) 
        {
            this.categoryMap.set(this.categoryList[i].id, this.categoryList[i].name);
        }
    })
  }
}
