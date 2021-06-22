import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  private searchData = new Subject<any>();
  public searchDataObservable$ = this.searchData.asObservable();
  doSearch(searchQuery: string) {
    this.http
      .get(`https://api.postalpincode.in/pincode/${searchQuery}`)
      .subscribe((data) => {
        this.searchData.next(data);
      });
  }
}
