import { Component, Inject } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpService } from '../http-service';

@Component({
  selector: 'app-enable-disable',
  imports: [ReactiveFormsModule],
  templateUrl: './enable-disable.html',
  styleUrl: './enable-disable.css'
})
export class EnableDisable {
isWaitingResponse = false;
  enableDisable_form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    session: new FormControl('', [Validators.required]),
    enDis: new FormControl('', [Validators.required,]),
  });

  constructor(private httpService: HttpService = Inject(HttpService)) {}

  enableDisable() {  // Do later
    this.isWaitingResponse = true;
    try {
      if (this.enableDisable_form.value?.enDis == "enable") {
        this.httpService.postData("users/enable", {
          id: this.enableDisable_form.value?.id,
          session: this.enableDisable_form.value?.session,
          enDis: this.enableDisable_form.value?.enDis
        }).subscribe((res) => {
          if (res.error) {
            console.log(`Error enabling user: ${res.message}`);
            alert(`Failed to enable user: ${res.message}`);
          }
          else {
            console.log(`Successful user enable`);
            alert(`Successfully enabled user!`);
          } 
        });
      }
      else {
        this.httpService.postData("users/disable", {
          id: this.enableDisable_form.value?.id,
          session: this.enableDisable_form.value?.session,
          enDis: this.enableDisable_form.value?.enDis
        }).subscribe((res) => {
          if (res.error) {
            console.error(`Error disabling user: ${res.message}`);
            alert(`Failed to disable user: ${res.message}`);
          }
          else {
            console.log(`Successful user disable`);
            alert(`Successfully disabled user!`);
          }
        });
      }
    } catch(error) {
      console.error("Error enabling/disabling: ", error);
      alert(`Failed to enable/disable user: ${error}`);
    } finally {
      this.isWaitingResponse = false;
    }
  }
}
