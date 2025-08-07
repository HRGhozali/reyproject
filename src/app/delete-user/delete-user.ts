import { Component, Inject } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpService } from '../http-service';

@Component({
  selector: 'app-delete-user',
  imports: [ReactiveFormsModule],
  templateUrl: './delete-user.html',
  styleUrl: './delete-user.css'
})
export class DeleteUser {
  isWaitingResponse = false;
  deleteUser_form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    session: new FormControl('', [Validators.required]),
  });

  constructor(private httpService: HttpService = Inject(HttpService)) {}

  deleteUser() {  // Do later
    this.isWaitingResponse = true;
    try {
      this.httpService.postData("users/delete", {
        id: this.deleteUser_form.value?.id,
        session: this.deleteUser_form.value?.session,
      }).subscribe((res) => {
        if (res.error) {
          console.error(`Error deleting user: ${res.message}`);
          alert(`Error deleting user: ${res.message}`);
        }
        else {
          console.log(`Successful deletion`);
          alert(`Successfully deleted user!`);
        }
      });
    } catch(error) {
      console.error("Error deleting user: ", error);
      alert(`Failed to delete user: ${error}`);
    } finally {
      this.isWaitingResponse = false;
    }
  }
}
