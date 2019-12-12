import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { PostVM } from '../../models/blog/PostVM';
import { PagingVM } from '../../models/PagingVM';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  postList: PostVM[];
  post1: PostVM;
  post2: PostVM;
  post3: PostVM;
  post4: PostVM;
  post5: PostVM;
  post6: PostVM;
  post7: PostVM;
  post8: PostVM;
  post9: PostVM;
  post10: PostVM;

  constructor(private _blogService: BlogService) { }

  ngOnInit() {
    this.getSliderPosts();
  }

  getSliderPosts()
  {
    this._blogService.get(10, 0).subscribe(response=>{
        this.postList = response.result.postList;
        this.post1 = this.postList[0];
        this.post2 = this.postList[1];
        this.post3 = this.postList[2];
        this.post4 = this.postList[3];
        this.post5 = this.postList[4];
        this.post6 = this.postList[5];
        this.post7 = this.postList[6];
        this.post8 = this.postList[7];
        this.post9 = this.postList[8];
        this.post10 = this.postList[9];
    })
  }
}
