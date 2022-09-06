import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { DeviceComponent } from './device/device.component';

const routes: Routes = [
    {path: "", component: DeviceComponent },
    {path:"cart",component: CartComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
