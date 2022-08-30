import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDeviceComponent } from './components/device/show-device/show-device.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
    { path: "", component: ShowDeviceComponent,canActivate:[AuthGuard] },
    {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
