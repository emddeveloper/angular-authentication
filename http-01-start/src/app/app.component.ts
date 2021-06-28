import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    //console.log(postData);
    this.http
      .post(
        "https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
        postData
      )
      .subscribe((response: { name: string }) => {
        console.log(response),
          (error) => {
            console.log(error);
          };
        this.getPosts();
      });
  }
  private getPosts() {
    this.isFetching = true;
    this.http
      .get(
        "https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
      )
      .pipe(
        map((rawdata: { [key: string]: Post }) => {
          const modifieddata: Post[] = [];
          for (let key in rawdata) {
            if (rawdata.hasOwnProperty(key)) {
              modifieddata.push({ ...rawdata[key], id: key });
            }
          }
          return modifieddata;
        })
      )
      .subscribe((response) => {
        this.isFetching = false;
        console.log(response),
          (this.loadedPosts = response),
          (error) => console.log(error);
      });
  }
  onFetchPosts() {
    // Send Http request
    this.getPosts();
  }

  onClearPosts() {
    // Send Http request
  }
}
