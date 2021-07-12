import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { PostService } from "./post.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = "";
  constructor(private http: HttpClient, private postservice: PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: any) {
    this.postservice.createPost(postData.value).subscribe((response: any) => {
      postData.value.id = response.name;
      console.log(postData);
      this.loadedPosts.push(postData.value);
      postData.reset();
    });
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postservice.getposts().subscribe(
      (response: Post[]) => {
        this.isFetching = false;
        this.loadedPosts = response;
      },
      (error) => {
        this.isFetching = false;
        console.log(error);
        this.error = error;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postservice.deleteAll().subscribe((response) => {
      console.log(response);
      this.loadedPosts = [];
    });
  }
  resetform() {}
  delete(id: string) {
    this.postservice.deleteOne(id).subscribe((response) => {
      this.loadedPosts = this.loadedPosts.filter((post) => {
        return post.id !== id;
      });
    });
  }
}
