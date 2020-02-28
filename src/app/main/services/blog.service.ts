import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResult } from '../models/ServiceResult';
import { PostListResponseDetailsVM } from '../models/blog/PostListResponseDetailsVM';
import { PostResponseDetailsVM } from '../models/blog/PostResponseDetailsVM';
import { StandartResponseDetailsVM } from '../models/StandartResponseDetailsVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';
import { PagingVM } from '../models/PagingVM';
import { PostSearchCriteriaVM } from '../models/blog/PostSearchCriteriaVM';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private baseService: BaseService) { }

  get(criteria: PostSearchCriteriaVM) : Observable<ServiceResult<PostListResponseDetailsVM>>{
    let myParams = new HttpParams()
      .append('ItemCount', criteria.itemCount.toString())
      .append('PageId', criteria.pageId.toString())
      .append('IsSliderPost', "false")
      .append('CategoryId', criteria.categoryId.toString());

      return this.baseService.get<PostListResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Blog.GetAll,myParams);
  }

  getSliderPosts() : Observable<ServiceResult<PostListResponseDetailsVM>>{
      return this.baseService.get<PostListResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Blog.GetSliderPosts, null);
  }

  getMostPopularPosts(criteria: PostSearchCriteriaVM) : Observable<ServiceResult<PostListResponseDetailsVM>>{
    let myParams = new HttpParams()
      .append('ItemCount', criteria.itemCount.toString())
      .append('PageId', criteria.pageId.toString())
      .append('CategoryId', criteria.categoryId.toString());

      return this.baseService.get<PostListResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Blog.GetMostPopularPosts, myParams);
  }

  getById(id) : Observable<ServiceResult<PostResponseDetailsVM>> {
    let myParams = new HttpParams()
    .append('id', id)

    return this.baseService.get<PostResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Blog.GetById, myParams);
  }

  addComment(comment): Observable<ServiceResult<StandartResponseDetailsVM>>
  {
    return this.baseService.post(apiConfig.Api.Main.Url + apiConfig.Services.Blog.AddComment, comment);
  }
}
