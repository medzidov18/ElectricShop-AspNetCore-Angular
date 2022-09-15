import { Component, OnInit } from '@angular/core';
import { IDevice } from 'src/app/Models/device';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  devices : IDevice[] = [];
  totalItem : number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getDevices();
    this.devices = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    this.totalItem = this.devices.length;
  }
  
}
