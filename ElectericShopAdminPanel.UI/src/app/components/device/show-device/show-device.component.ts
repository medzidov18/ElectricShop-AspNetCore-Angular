import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { IDevice } from 'src/app/models/device';
import { Observable } from 'rxjs/internal/Observable';
import { ICategory } from './../../../models/category';
import { IRam } from './../../../models/ram';
import { Imemory } from './../../../models/memory';

@Component({
  selector: 'app-show-device',
  templateUrl: './show-device.component.html',
  styleUrls: ['./show-device.component.css'],

})
export class ShowDeviceComponent implements OnInit {

  devices: IDevice[] = []
  categories: ICategory[] = []
  rams: IRam[] = []
  memories: Imemory[] = []
  categoryList: any[];
  ramList: any[];
  memoryList: any[];
  categoryList$: Observable<any[]>;
  ramList$: Observable<any[]>;
  memoryList$: Observable<any[]>; 
  term: any;

  categoryMap: Map<number, string> = new Map();
  ramMap: Map<number, string> = new Map();
  memoryMap: Map<number, string> = new Map();

  constructor(private service: DeviceApiService) { }

  ngOnInit(): void {
    this.ramList$ = this.service.getRamList();
    this.memoryList$ = this.service.getMemoryList(); 
    this.service.getDevicesList().subscribe(devices => {
        this.devices = devices;
        this.refreshCategoryMap();
    })
    this.categoryList$ = this.service.getCategoryList();
       
    this.refreshAllMaps();
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
          fullDescription: '',
          raM_ID: 0,
          memoryId: 0,
          amount: 0
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
        this.refreshAllMaps();
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
        this.refreshAllMaps();
    })
})
}
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
