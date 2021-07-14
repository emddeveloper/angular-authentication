import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { post } from '../models/post.model';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnInit {
  constructor(private http: HttpClient, private authservice: AuthService) {}
  createPost(postdata: post) {
    return this.http
      .post(
        'https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/skposts.json',
        postdata
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getAllPost() {
    return this.http
      .get(
        'https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/skposts.json'
      )
      .pipe(
        map((response) => {
          const modifiedRes = [];
          for (let key in response) {
            modifiedRes.push({ ...response[key], id: key });
          }
          return modifiedRes;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  deleteAll() {
    return this.http
      .delete(
        'https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/skposts.json'
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  deleteOne(id: string) {
    return this.http
      .delete(
        `https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/skposts/${id}.json`
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  updatePost(updatePostData: post) {
    return this.http
      .put(
        `https://skangular-9c64f-default-rtdb.asia-southeast1.firebasedatabase.app/skposts/${updatePostData.id}.json`,
        updatePostData
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  ngOnInit() {}
}
