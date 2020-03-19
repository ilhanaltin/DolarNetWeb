import { Component, OnInit } from '@angular/core';
import { PostVM } from '../../models/blog/PostVM';
import { BlogService } from '../../services/blog.service';
import { PostSearchCriteriaVM } from '../../models/blog/PostSearchCriteriaVM';
import { GlobalConstants } from '../../models/constants/GlobalConstants';
import { TitleTagService } from '../../services/TitleTagService';
import { Router } from '@angular/router';

@Component({
  selector: 'home-post-list',
  templateUrl: './home-post-list.component.html',
  styleUrls: ['./home-post-list.component.css']
})
export class HomePostListComponent implements OnInit {

  readonly _globalConstants = GlobalConstants;

  postList: PostVM[];

  constructor(private _blogService: BlogService,
    private _router: Router,
    private titleTagService: TitleTagService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts()
  {
    let criteria = new PostSearchCriteriaVM();
    criteria.itemCount = 10;
    criteria.pageId=0;
    criteria.categoryId = -1;
    
    this._blogService.get(criteria).subscribe(response=>{
        this.postList = response.result.postList;
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
}
