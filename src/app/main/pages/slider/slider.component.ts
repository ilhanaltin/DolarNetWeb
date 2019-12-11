import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { PostVM } from '../../models/blog/PostVM';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  postList: PostVM[];
  main: any = "";

  constructor(private _blogService: BlogService) { }

  ngOnInit() {
    this.getSliderPosts();
  }

  getSliderPosts()
  {
    this._blogService.get().subscribe(response=>{
        this.postList = response.result.postList;
        console.log(this.postList);
        this.main = this.postList[0].mainImage;
    })
  }
}
