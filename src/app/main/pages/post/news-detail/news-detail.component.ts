import { BlogService } from '../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostVM } from '../../../models/blog/PostVM';

@Component({
  selector: 'news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  post: PostVM;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private _blogService: BlogService) 
    {
      this.post = new PostVM({});
      
    }

  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap)=> {  
          this._blogService.getById(params.get('id')).subscribe(response => {
            this.post = response.result.post;
        });
    });
  }
}