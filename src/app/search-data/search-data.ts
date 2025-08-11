import { Component, Input } from '@angular/core';
import { SearchResults } from '../search-results';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.html',
  styleUrls: ['./search-data.css'],
  imports: [RouterModule]
})
export class SearchData {
  @Input() searchData!: SearchResults;

  constructor(private router: Router) {}
}