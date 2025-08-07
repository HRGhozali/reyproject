import { Component, Inject } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpService } from '../http-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isWaitingResponse = false;
  login_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
  });

  constructor(private httpService: HttpService = Inject(HttpService), private router: Router) {}

  login() {  // finish later
    this.isWaitingResponse = true;
    try {
      this.httpService.postDataNoAuth("users/login", {
        email: this.login_form.value?.email,
        password: this.login_form.value?.password,
      }).subscribe((res) => {
        if (res.error) {
          console.error("Error logging in:", res?.message);
          alert(`Failed to log in: ${res.message}`);
        }
        else {
          console.log(`Successful login as ${res?.data?.email}`);
          alert(`Successfully logged in as ${res?.data?.email}`);
        }
      });
    } catch(error) {
      console.error("Error logging in:", error);
      alert(`Failed to log in: ${error}`);
    } finally {
      this.isWaitingResponse = false;
    }
  };
}
