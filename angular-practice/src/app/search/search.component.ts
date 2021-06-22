import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-serarch-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private search: SearchService) {}
  searchData: any;
  onSearch(searchText: HTMLInputElement) {
    this.search.doSearch(searchText.value);
  }

  ngOnInit() {
    this.search.searchDataObservable$.subscribe((data) => {
      this.searchData = data;
    });
  }
}
