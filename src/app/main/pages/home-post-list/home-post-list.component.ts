import { Component, OnInit } from '@angular/core';
import { PostVM } from '../../models/blog/PostVM';
import { BlogService } from '../../services/blog.service';
import { PostSearchCriteriaVM } from '../../models/blog/PostSearchCriteriaVM';

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
    let criteria = new PostSearchCriteriaVM();
    criteria.itemCount = 10;
    criteria.pageId=0;
    criteria.isSliderPost = false;
    criteria.categoryId = -1;
    
    this._blogService.get(criteria).subscribe(response=>{
        this.postList = response.result.postList;
    })
  }
}
