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
  title = 'ElectricShop.UI';
  devices: IDevice[] = []

  constructor(private service: DeviceApiService) { }
  
  ngOnInit(): void {
    this.service.getDevicesList().subscribe(devices => {
        this.devices = devices;
    })
  }
}
