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

  devices: IDevice[] = []
  categoryList: any[];
  categoryMap: Map<number, string> = new Map();


  ngOnInit(): void {
    this.refreshCategoryMap();
  }

    modalTitle: string = '';
    activateAddEditDeviceComponent: boolean = false;

  modalEdit(device: any) {
    this.device = device;
    this.modalTitle = "Редактирование устройства";
    this.activateAddEditDeviceComponent = true;
  }

modalClose() {
    this.activateAddEditDeviceComponent = false;
    this.service.getDevicesList().subscribe(devices => {
        this.devices = devices;
        this.refreshCategoryMap();
    })
}
delete(device: any) {
    if (confirm(`Вы уверены что хотите удалить устройство ${device.id}`)) {
        this.service.deleteDevice(device.id).subscribe(res => {
            var closeModalBtn = document.getElementById('add-edit-modal-close');
    if (closeModalBtn) {
        closeModalBtn.click();
    }
    var showDeleteSuccess = document.getElementById('delete-success-alert');
    if (showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
    }
    setTimeout(function() {
        if (showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
        }
    }, 4000);
    this.service.getDevicesList().subscribe(devices => {
        this.devices = devices;
        this.refreshCategoryMap();
    })
})
}
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
