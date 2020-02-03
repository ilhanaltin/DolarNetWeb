import { Component, OnInit } from '@angular/core';
import { PostVM } from 'src/app/main/models/blog/PostVM';
import { BlogService } from 'src/app/main/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { PostSearchCriteriaVM } from 'src/app/main/models/blog/PostSearchCriteriaVM';
import { GlobalConstants } from 'src/app/main/models/constants/GlobalConstants';

@Component({
  selector: 'news-latest',
  templateUrl: './news-latest.component.html',
  styleUrls: ['./news-latest.component.css']
})
export class NewsLatestComponent implements OnInit {

  readonly _globalConstants = GlobalConstants;

  postList: PostVM[];

  constructor(private _blogService: BlogService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts()
  {
    let criteria = new PostSearchCriteriaVM();
    criteria.itemCount = 4;
    criteria.pageId = 0;
    criteria.categoryId = -1;
    
    this._blogService.get(criteria).subscribe(response=>{
        this.postList = response.result.postList;
    });
  }

  removeHtmlTags(content : string) : string
  {
      return content.trim().slice(0, 300).replace(/<[^>]+>/g, '');
  }
}
