import { Component, OnInit } from '@angular/core';
import { PostSearchCriteriaVM } from '../../../models/blog/PostSearchCriteriaVM';
import { BlogService } from '../../../services/blog.service';
import { PostVM } from '../../../models/blog/PostVM';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/main/models/constants/GlobalConstants';
import { TitleTagService } from 'src/app/main/services/TitleTagService';

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
    private route: ActivatedRoute,
    private _router: Router,
    private titleTagService: TitleTagService) 
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

  routeToNewsDetail(post)
  {
      this.titleTagService.setTitle(post.title + " - Dolar.Net");
          
      this.titleTagService.setSocialMediaTags(
        'https://dolar.net/' + post.urlFromTitle + "/" + post.id, 
          post.title,
          post.longTitle,
          post.imagePath);

      this._router.navigate(['/', post.urlFromTitle, post.id]);
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

  getHeader()
  {
      if(this.categoryId === undefined || this.categoryId === 0)
      {
          return "Haberler";
      }
      return GlobalConstants.PostCategoriesLongName[this.categoryId - 1] + " Haberleri";
  }
}
