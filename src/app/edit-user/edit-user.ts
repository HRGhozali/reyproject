import { Component, Inject } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpService } from '../http-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css'
})
export class EditUser {
  isWaitingResponse = false;
  editUsers_form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    session: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    mobile: new FormControl(''),
    accessLevel: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.min(1), Validators.max(4)]),
  });

  constructor(private httpService: HttpService = Inject(HttpService), private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const user = nav?.extras?.state?.['user'];
    if (user) {
      this.editUsers_form.patchValue({
        id: user.id,
        session: user.session ?? '',
        firstName: user.firstName ?? user.fullName?.split(' ')[0] ?? '',
        lastName: user.lastName ?? user.fullName?.split(' ')[1] ?? '',
        password: '',
        mobile: user.mobile ?? '',
        accessLevel: user.accessLevel ?? '',
      });
    }
  }

  editUsers() {  // Do later
    this.isWaitingResponse = true;
    try {
      this.httpService.postData("users/edit", {
        id: this.editUsers_form.value?.id,
        session: this.editUsers_form.value?.session,
        firstName: this.editUsers_form.value?.firstName,
        lastName: this.editUsers_form.value?.lastName,
        mobile: this.editUsers_form.value?.mobile,
        accessLevel: this.editUsers_form.value?.accessLevel,
        password: this.editUsers_form.value?.password,
      }).subscribe((res) => {
        if (res.error) {
          console.error("Error editing user: ", res?.message);
          alert(`Failed to edit user: ${res.message}`);
        }
        else {
          console.log(`Successfully edited user!`);
          alert(`Successfully edited user!`);
        }
      });
    } catch(error) {
      console.error("Error editing user: ", error);
      alert(`Failed to edit user: ${error}`);
    } finally {
      this.isWaitingResponse = false;
    }
  }
}
