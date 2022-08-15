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
  categoryList$: Observable<any[]>;
  categoryList: any[];

  categoryMap: Map<number, string> = new Map();

  constructor(private service: DeviceApiService) { }
  
  ngOnInit(): void {
    this.service.getDevicesList().subscribe(devices => {
        this.devices = devices;
    })
    this.categoryList$ = this.service.getCategoryList();
    this.refreshCategoryMap();
  }

  modalTitle: string = '';
  activateAddEditDeviceComponent: boolean = false;
  device: any;

  modalAdd() {
    this.device = {
        id: 0,
        name: null,
        image: null,
        shortDescription: null,
        fullDescription: null,
        price: 0,
        categoryId: 0
    }
    this.modalTitle = "Добавить устройство";
    this.activateAddEditDeviceComponent = true;
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
}
