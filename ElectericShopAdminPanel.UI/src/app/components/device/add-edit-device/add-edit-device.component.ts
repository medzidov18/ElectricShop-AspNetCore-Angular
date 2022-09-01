import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { IDevice } from 'src/app/models/device';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css'],
})
export class AddEditDeviceComponent implements OnInit {

  categoryList$: Observable<any[]>;  
  devices: IDevice[] = []

  constructor(private service: DeviceApiService) { }

  @Input() device: any;
  id: number = 0;
  name: string = "";
  image: string = "";
  shortDescription: string = "";
  fullDescription: string = "";
  price: number;
  categoryId: number;

  ngOnInit(): void {
    this.id = this.device.id;
    this.name = this.device.name;
    this.image = this.device.image;
    this.shortDescription = this.device.shortDescription;
    this.fullDescription = this.device.fullDescription;
    this.price = this.device.price;
    this.categoryId = this.device.categoryId;
    this.service.getDevicesList().subscribe(devices => {
        this.devices = devices;
    })
    this.categoryList$ = this.service.getCategoryList();
  }

  addDevice() {
    var device = {
        name: this.name,
        image: this.image,
        shortDescription: this.shortDescription,
        fullDescription: this.fullDescription,
        price: this.price,
        categoryId: this.categoryId
    }
    this.service.addDevice(device).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
            closeModalBtn.click();
        }
        var showAddSuccess = document.getElementById('add-success-alert');
        if (showAddSuccess) {
            showAddSuccess.style.display = "block";
        }
        setTimeout(function() {
            if (showAddSuccess) {
                showAddSuccess.style.display = "none";
            }
        }, 4000)
    })    
  }

  updateDevice() {
    var device = {
        id: this.id,
        name: this.name,
        image: this.image,
        shortDescription: this.shortDescription,
        fullDescription: this.fullDescription,
        price: this.price,
        categoryId: this.device.categoryId
    }
    var id: number = this.id;
    this.service.updateDevice(id, device).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
            closeModalBtn.click();
        }
        var showUpdateSuccess = document.getElementById('update-success-alert');
        if (showUpdateSuccess) {
            showUpdateSuccess.style.display = "block";
        }
        setTimeout(function() {
            if (showUpdateSuccess) {
                showUpdateSuccess.style.display = "none";
            }
        }, 4000)
    })    
  }
}