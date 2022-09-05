import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceApiService } from '../services/device-api.service';
import { IDevice } from '../Models/device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

    title = 'ElectricShop.UI';
    devices: IDevice[] = [];
    ramList: any[];
    memoryList: any[];
    categoryList$: Observable<any[]>;
    categoryList: any[];
  
    categoryMap: Map<number, string> = new Map();
    ramMap: Map<number, string> = new Map();
    memoryMap: Map<number, string> = new Map();
  
    constructor(private service: DeviceApiService) { }
    
    ngOnInit(): void {
      this.service.getDevicesList().subscribe(devices => {
          this.devices = devices;
          this.refreshCategoryMap();
      })
    }

    modalTitle: string = '';
    activateAddEditDeviceComponent: boolean = false;
    device: any;

    laptopDevices() {
        this.service.getDevicesListWithOneCategory(2).subscribe(devices => {
            this.devices = devices;
            this.refreshCategoryMap();
        })
    }

    phoneDevices() {
        this.service.getDevicesListWithOneCategory(1).subscribe(devices => {
            this.devices = devices;
            this.refreshCategoryMap();
        })
    }
  
    refreshCategoryMap() {
      this.service.getCategoryList().subscribe(data => {
          this.categoryList = data;
  
          for (let i = 0; i < data.length; i++) 
          {
              this.categoryMap.set(this.categoryList[i].id, this.categoryList[i].name);
          }
      })
    }
    refreshRamMap() {
        this.service.getRamList().subscribe(data1 => {
            this.ramList = data1;
    
            for (let i = 0; i < data1.length; i++) 
            {
                this.ramMap.set(this.ramList[i].id, this.ramList[i].capacity);
            }
        })
      }
      refreshMemoryMap() {
        this.service.getMemoryList().subscribe(data2 => {
            this.memoryList = data2;
    
            for (let i = 0; i < data2.length; i++) 
            {
                this.memoryMap.set(this.memoryList[i].id, this.memoryList[i].capacity);
            }
        })
      }
      refreshAllMaps() {
        this.refreshCategoryMap(),
        this.refreshRamMap(),
        this.refreshMemoryMap()
      }
}
