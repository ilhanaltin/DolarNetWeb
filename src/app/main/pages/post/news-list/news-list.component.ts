import { Component, OnInit } from '@angular/core';
import { PostSearchCriteriaVM } from '../../../models/blog/PostSearchCriteriaVM';
import { BlogService } from '../../../services/blog.service';
import { PostVM } from '../../../models/blog/PostVM';

@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  postList: PostVM[];

  constructor(private _blogService: BlogService) { }

  ngOnInit() {
    this.getPosts()
  }

  getPosts()
  {
    let criteria = new PostSearchCriteriaVM();
    criteria.itemCount = 10;
    criteria.pageId = 0;
    criteria.isSliderPost = false;
    criteria.categoryId = -1;
    
    this._blogService.get(criteria).subscribe(response=>{
        this.postList = response.result.postList;
    });
  }

  removeHtmlTags(content : string) : string
  {
      return content.trim().slice(0,400).replace(/<[^>]+>/g, '');
  }
}
