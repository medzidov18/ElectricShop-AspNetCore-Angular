import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { IDevice } from 'src/app/models/device';
import { Observable } from 'rxjs/internal/Observable';
import { ICategory } from './../../../models/category';

@Component({
  selector: 'app-show-device',
  templateUrl: './show-device.component.html',
  styleUrls: ['./show-device.component.css'],

})
export class ShowDeviceComponent implements OnInit {

  devices: IDevice[] = []
  categories: ICategory[] = []
  categoryList: any[];
  categoryList$: Observable<any[]>;
  term: any;

  categoryMap: Map<number, string> = new Map();

  constructor(private service: DeviceApiService) { }

  ngOnInit(): void {
    this.service.getDevicesList().subscribe(devices => {
        this.devices = devices;
        this.refreshCategoryMap();
    })
    this.service.getCategoryList().subscribe(categories => {
        this.categories = categories;
    })
    this.categoryList$ = this.service.getCategoryList();
    this.refreshCategoryMap();
  }

    modalTitle: string = '';
    activateAddEditDeviceComponent: boolean = false;
    device: IDevice;

    modalAdd() {
        this.device = {
          id:0,
          image:'',
          name:'',
          categoryId:0,
          price: 0,
          shortDescription: '',
          fullDescription: ''
        }
        this.modalTitle = "Добавить устройство";
        this.activateAddEditDeviceComponent = true;
      }

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

getDevicesListWithOneCategory(id: number) {
    this.service.getDevicesListWithOneCategory(id).subscribe(devices => {
        this.devices = devices;
        this.refreshCategoryMap();
    })
}

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
