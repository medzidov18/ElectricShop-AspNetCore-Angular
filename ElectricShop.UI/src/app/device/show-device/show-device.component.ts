import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceApiService } from 'src/app/device-api.service';

@Component({
  selector: 'app-show-device',
  templateUrl: './show-device.component.html',
  styleUrls: ['./show-device.component.css']
})
export class ShowDeviceComponent implements OnInit {

  deviceList$!: Observable<any[]>;

  constructor(private service: DeviceApiService) { }

  ngOnInit(): void {
    this.deviceList$ = this.service.getDevicesList();
  }

}
