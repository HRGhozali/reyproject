import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpService } from '../http-service';
import {SearchResults} from '../search-results';
import {CommonModule} from '@angular/common';
import {SearchData} from '../search-data/search-data'

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, CommonModule, SearchData],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  isWaitingResponse = false;
  searchList: SearchResults[] = [];
  searchMany_form = new FormGroup({
    search: new FormControl(''),
    getActive: new FormControl('', [Validators.required]),
  });

  searchOne_form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private httpService: HttpService = Inject(HttpService),
    private cdr: ChangeDetectorRef
  ) {}

  searchMany() {  // Do later
    this.isWaitingResponse = true;
    try {
      this.searchList = [];
      let getActiveRaw = this.searchMany_form.value?.getActive;
      let getActive = (getActiveRaw === 'True') ? true : false;
      console.log(`${this.searchMany_form.value?.search}, ${this.searchMany_form.value?.getActive}`)
      this.httpService.postData("users/getList", {
        search: this.searchMany_form.value?.search,
        getActive: getActive,
      }).subscribe((res) => {
        if (res.error) {
          console.log("Error searching users: ", res?.message);
          alert(`Failed to search users: ${res.message}`);
        }
        else {
          console.log(`Successful search`);
          for (let i = 0; i < res.data?.length; i++) {
            let match : SearchResults = {
              id: res.data[i].id,
              fullName: `${res.data[i].firstName} ${res.data[i].lastName}`,
              email: res.data[i].email,
              session: -1,
              createdBy: 'irrelevant',
              updatedBy: 'irrelevant',
              isList: true,
              accessName: res.data[i].accessName,
              active: res.data[i].active
            }
            this.searchList.push(match);
          }
          this.cdr.detectChanges();
          alert(`Successfully searched all users!`);
        }    
      });
    } catch(error) {
      console.error("Error searching: ", error);
      alert(`Failed to search: ${error}`);
    } finally {
      this.isWaitingResponse = false;
    }
  }

  searchOne() {  // Do later
    this.isWaitingResponse = true;
    this.searchList = [];
    try {
      this.httpService.postData("users/getUser", {
        id: this.searchOne_form.value?.id,
        email: this.searchOne_form.value?.email,
      }).subscribe((res) => {
        if (res.error) {
          console.error("Error searching user: ", res?.message);
          alert(`Failed to search user: ${res.message}`);
        }
        else {
          console.log(`Successful search`);
          let match : SearchResults = {
              id: res.data.id,
              fullName: res.data.fullName,
              email: res.data.email,
              session: res.data.session,
              createdBy: res.data.createdby,
              updatedBy: res.data.updatedby,
              isList: false,
              accessName: 'irrelevant',
              active: true
            }
            this.searchList.push(match);
          this.cdr.detectChanges();
          alert('Successfully searched user!');
        }
      });
    } catch(error) {
      console.error("Error search: ", error);
      alert(`Failed to search: ${error}`);
    } finally {
      this.isWaitingResponse = false;
    }
  }
}
