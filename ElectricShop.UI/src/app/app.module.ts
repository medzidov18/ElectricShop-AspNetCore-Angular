import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './device/device.component';
import { ShowDeviceComponent } from './device/show-device/show-device.component';
import { DeviceApiService } from './services/device-api.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FavouriteComponent } from './device/favourite/favourite.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';


const appRoute: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: DeviceComponent},
    {path: 'About', component: AboutUsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    ShowDeviceComponent,
    AboutUsComponent,
    FavouriteComponent,
    HeaderComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [DeviceApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
