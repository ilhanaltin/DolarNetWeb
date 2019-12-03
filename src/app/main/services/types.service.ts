import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TypeResponseDetailsVM } from '../models/types/TypeResponseDetailsVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor(private baseService: BaseService) { }

  get(action: string){
      return this.baseService.get<TypeResponseDetailsVM>(apiConfig.Api.Main.Url + action);
  }
}
