import { Component, OnInit } from '@angular/core';
import { PostSearchCriteriaVM } from '../../../models/blog/PostSearchCriteriaVM';
import { BlogService } from '../../../services/blog.service';
import { PostVM } from '../../../models/blog/PostVM';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GlobalConstants } from 'src/app/main/models/constants/GlobalConstants';

@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  readonly _globalConstants = GlobalConstants;

  postList: PostVM[];
  categoryId: number;

  constructor(
    private _blogService: BlogService,
    private route: ActivatedRoute) 
    { 
      
    }

  ngOnInit() {
      this.route.paramMap.subscribe((params : ParamMap)=> {  
        
        if(params.get('category') == null || params.get('category') == "")
        {
          this.getPosts(-1);
        }
        else
        {
          this.getPosts(params.get('category'));
          this.categoryId = +params.get('category');
        }
      });
  }

  getPosts(category)
  {
    let criteria = new PostSearchCriteriaVM();
    criteria.itemCount = 10;
    criteria.pageId = 0;
    criteria.categoryId = category;
    
    this._blogService.get(criteria).subscribe(response=>{
        this.postList = response.result.postList;
    });
  }

  removeHtmlTags(content : string) : string
  {
      return content.trim().slice(0,400).replace(/<[^>]+>/g, '');
  }

  getHeader()
  {
      if(this.categoryId === undefined || this.categoryId === 0)
      {
          return "Haberler";
      }
      return GlobalConstants.PostCategoriesLongName[this.categoryId - 1] + " Haberleri";
  }
}
