import { Component, Input } from '@angular/core';
import { SearchResults } from '../search-results';

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.html',
  styleUrls: ['./search-data.css']
})
export class SearchData {
  @Input() searchData!: SearchResults;
}