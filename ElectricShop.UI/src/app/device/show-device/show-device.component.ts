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

  ngOnInit(): void {
  }

  details = false

}
