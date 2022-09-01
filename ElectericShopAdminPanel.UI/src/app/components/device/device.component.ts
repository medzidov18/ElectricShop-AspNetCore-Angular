import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { IDevice } from 'src/app/models/device';
import { AddEditDeviceComponent } from './add-edit-device/add-edit-device.component';
import { ShowDeviceComponent } from './show-device/show-device.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']})
export class DeviceComponent implements OnInit {
    devices: IDevice[] = []

    constructor(private service: DeviceApiService) { }
    
    ngOnInit(): void {
      
    }

    modalTitle: string = '';
    activateAddEditDeviceComponent: boolean = false;

    laptopDevices() {
        this.service.getDevicesListWithOneCategory(2).subscribe(devices => {
            this.devices = devices;
        })
    }

    phoneDevices() {
        this.service.getDevicesListWithOneCategory(1).subscribe(devices => {
            this.devices = devices;
        })
    }
}
