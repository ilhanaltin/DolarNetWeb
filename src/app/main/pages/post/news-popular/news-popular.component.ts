import { PostVM } from './../../../models/blog/PostVM';
import { Component, OnInit } from '@angular/core';
import { PostSearchCriteriaVM } from 'src/app/main/models/blog/PostSearchCriteriaVM';
import { BlogService } from 'src/app/main/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from 'src/app/main/models/constants/GlobalConstants';

@Component({
  selector: 'news-popular',
  templateUrl: './news-popular.component.html',
  styleUrls: ['./news-popular.component.css']
})
export class NewsPopularComponent implements OnInit {

  readonly _globalConstants = GlobalConstants;

  postList: PostVM[];

  constructor(
    private _blogService: BlogService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts()
  {
    let criteria = new PostSearchCriteriaVM();
    criteria.itemCount = 4;
    criteria.pageId = 0;
    criteria.categoryId = -1;
    
    this._blogService.getMostPopularPosts(criteria).subscribe(response=>{
        this.postList = response.result.postList;
    });
  }

  removeHtmlTags(content : string) : string
  {
      return content.trim().slice(0,400).replace(/<[^>]+>/g, '');
  }
}
