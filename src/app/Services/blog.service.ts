import { PostResponseDetailsVM } from './../Models/Blog/PostResponseDetailsVM';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PostListResponseDetailsVM } from '../Models/Blog/PostListResponseDetailsVM';
import { Observable } from 'rxjs';
import { ServiceResult } from '../Models/ServiceResult';
import { StandartResponseDetailsVM } from '../Models/StandartResponseDetailsVM';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private baseService: BaseService) { }

  get(){
    let myParams = new HttpParams()
      .append('ItemCount', '10')
      .append('PageId', '1')
      .append('CategoryId', '-1');

      return this.baseService.get<PostListResponseDetailsVM>(environment.Api.Main.Url + environment.Services.Blog.GetAll,myParams);
  }

  getById() : Observable<ServiceResult<PostResponseDetailsVM>> {
    let myParams = new HttpParams()
    .append('id', '1')

    return this.baseService.get<PostResponseDetailsVM>(environment.Api.Main.Url + environment.Services.Blog.GetById, myParams);
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>{
    let post = {
      Id: 2,
      Title: 'Test Post',
      AuthorId: 1,
      Content: 'test post',
      PostCategoryTypeId: 1,
      PostStatusTypeId: 1
    };

    return this.baseService.post<StandartResponseDetailsVM>(environment.Api.Main.Url + environment.Services.Blog.Post, post);
  }

  delete(): Observable<ServiceResult<StandartResponseDetailsVM>>{
    let myParams = new HttpParams()
      .append('id', '1')

      return this.baseService.delete<StandartResponseDetailsVM>(environment.Api.Main.Url + environment.Services.Blog.Delete, myParams);
  }
}
