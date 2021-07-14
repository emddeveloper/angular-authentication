import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  allpost: post[] = [];
  formpostdata: post = {
    title: '',
    content: '',
    id: '',
  };
  isUpdate = false;
  constructor(private postservice: PostService) {}
  createPost(postdata: NgForm) {
    if (this.isUpdate) {
      postdata.value.id = this.formpostdata.id;
      this.postservice.updatePost(postdata.value).subscribe((response) => {
        console.log(response);
        this.getAllPost();
        this.isUpdate = false;
        postdata.reset();
      });
    } else {
      console.log(postdata);
      this.postservice.createPost(postdata.value).subscribe((response) => {
        this.allpost.push(postdata.value);
        console.log(response);
        postdata.reset();
      });
    }
  }
  deleteOne(id: string) {
    this.postservice.deleteOne(id).subscribe((response) => {
      console.log(response);
      this.allpost = this.allpost.filter((post) => {
        return post.id !== id;
      });
    });
  }
  deleteAll() {
    this.postservice.deleteAll().subscribe((response) => {
      console.log(response);
      this.allpost = [];
    });
  }
  updateOne(updatepost: post) {
    this.isUpdate = true;
    this.formpostdata = updatepost;
  }
  getAllPost() {
    this.postservice.getAllPost().subscribe((response) => {
      this.allpost = response;
    });
  }
  ngOnInit(): void {
    this.getAllPost();
  }
}
