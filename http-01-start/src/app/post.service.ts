import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(private http: HttpClient) {}
  error = new Subject<{}>();
  getposts() {
    return this.http
      .get<{ [key: string]: Post }>(
        "https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
      )
      .pipe(
        map((rawdata) => {
          const modifieddata: Post[] = [];
          for (let key in rawdata) {
            modifieddata.push({ ...rawdata[key], id: key });
          }
          return modifieddata;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  //post created
  createPost(postData: Post) {
    // Send Http request
    //console.log(postData);
    return this.http
      .post(
        "https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
        postData
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          this.error.next(error);
          return error;
        })
      );
  }
  //delete all data
  deleteAll() {
    return this.http.delete(
      "https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
    );
  }
  //delete specific post
  deleteOne(id: string) {
    return this.http
      .delete(
        `https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: any) => {
          return error;
        })
      );
  }
}
