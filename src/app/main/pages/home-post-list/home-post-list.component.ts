import { Component, OnInit } from '@angular/core';
import { PostVM } from '../../models/blog/PostVM';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'home-post-list',
  templateUrl: './home-post-list.component.html',
  styleUrls: ['./home-post-list.component.css']
})
export class HomePostListComponent implements OnInit {

  postList: PostVM[];

  constructor(private _blogService: BlogService) { }

  ngOnInit() {
    this.getSliderPosts();
  }

  getSliderPosts()
  {
    this._blogService.get().subscribe(response=>{
        this.postList = response.result.postList;
        console.log(this.postList);
    })
  }
}
