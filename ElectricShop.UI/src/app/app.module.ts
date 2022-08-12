import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './device/device.component';
import { ShowDeviceComponent } from './device/show-device/show-device.component';
import { AddEditDeviceComponent } from './device/add-edit-device/add-edit-device.component';
import { DeviceApiService } from './device-api.service';

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    ShowDeviceComponent,
    AddEditDeviceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [DeviceApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
