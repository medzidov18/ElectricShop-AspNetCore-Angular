import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user = new User();
    responsedata: any;

  constructor(private authservice: AuthService, private route: Router) {
    localStorage.clear();
  }

  Login = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
  }

  login(user: User) {
    if (this.Login.valid) {
        this.authservice.login(this.user).subscribe((token: string) => {
            localStorage.setItem('authToken', token);
            this.route.navigate(['']);
          })
    }
  }

}
