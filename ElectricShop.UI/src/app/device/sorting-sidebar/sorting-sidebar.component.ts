import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IDevice } from 'src/app/Models/device';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-sorting-sidebar',
  templateUrl: './sorting-sidebar.component.html',
  styleUrls: ['./sorting-sidebar.component.css']
})
export class SortingSidebarComponent implements OnInit {
  devices: IDevice[] = [];
  ramList: any[];
  memoryList: any[];
  categoryList$: Observable<any[]>;
  categoryList: any[];
  
  categoryMap: Map<number, string> = new Map();
  ramMap: Map<number, string> = new Map();
  memoryMap: Map<number, string> = new Map();

  constructor(private service: DeviceApiService, private filterService: FilterService) { }

  ngOnInit(): void {
  }

  laptopDevices() {
    this.filterService.getDevicesListWithOneCategory(2).subscribe(res => {
        this.devices = res;
        this.refreshCategoryMap();
    })
    }

phoneDevices() {
    this.filterService.getDevicesListWithOneCategory(1).subscribe(res => {
        this.devices = res;
        this.refreshCategoryMap();
    })
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
