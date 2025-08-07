import { Component, Inject } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpService } from '../http-service';

@Component({
  selector: 'app-edit-email',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-email.html',
  styleUrl: './edit-email.css'
})
export class EditEmail {
  isWaitingResponse = false;
  editEmail_form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    session: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private httpService: HttpService = Inject(HttpService)) {}

  editEmail() {  // Do later
    this.isWaitingResponse = true;
    try {
      this.httpService.postData("users/editEmail", {
        id: this.editEmail_form.value?.id,
        session: this.editEmail_form.value?.session,
        email: this.editEmail_form.value?.email
      }).subscribe((res) => {
        if (res.error) {
          console.error("Error editing email: ", res?.message);
          alert(`Failed to edit email: ${res.message}`);
        }
        else {
          console.log(`Successful email edit`);
          alert(`Successfully edited email!`);
        }
      });
    } catch(error) {
      console.error("Error editing email: ", error);
      alert(`Failed to edit email: ${error}`);
    } finally {
      this.isWaitingResponse = false;
    }
  }
}
