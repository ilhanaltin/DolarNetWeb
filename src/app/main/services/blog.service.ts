import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResult } from '../models/ServiceResult';
import { PostListResponseDetailsVM } from '../models/blog/PostListResponseDetailsVM';
import { PostResponseDetailsVM } from '../models/blog/PostResponseDetailsVM';
import { StandartResponseDetailsVM } from '../models/StandartResponseDetailsVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private baseService: BaseService) { }

  get() : Observable<ServiceResult<PostListResponseDetailsVM>>{
    let myParams = new HttpParams()
      .append('ItemCount', '10')
      .append('PageId', '0')
      .append('CategoryId', '-1');

      return this.baseService.get<PostListResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Blog.GetAll,myParams);
  }

  getById() : Observable<ServiceResult<PostResponseDetailsVM>> {
    let myParams = new HttpParams()
    .append('id', '1')

    return this.baseService.get<PostResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Blog.GetById, myParams);
  }
}
