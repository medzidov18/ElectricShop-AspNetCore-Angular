import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { IDevice } from './../../Models/device';

@Component({
  selector: 'app-show-device',
  templateUrl: './show-device.component.html',
  styleUrls: ['./show-device.component.css']
})
export class ShowDeviceComponent implements OnInit {
  @Input() device: IDevice
  constructor(private service: DeviceApiService, private cartService : CartService) { }

  searchKey:string ="";
  devices: IDevice[] = []
  categoryList: any[];
  ramList: any[];
  memoryList: any[];
  ramList$: Observable<any[]>;
  memoryList$: Observable<any[]>; 
  
  categoryMap: Map<number, string> = new Map();
  ramMap: Map<number, string> = new Map();
  memoryMap: Map<number, string> = new Map();


  ngOnInit(): void {
    this.ramList$ = this.service.getRamList();
    this.memoryList$ = this.service.getMemoryList(); 
    this.refreshAllMaps();
    this.cartService.search.subscribe((val:any)=>{
        this.searchKey = val;
      })
  }   

  addtocart(device: any){
    this.cartService.addToCart(device);
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
