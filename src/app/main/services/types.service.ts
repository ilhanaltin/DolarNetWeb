import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { TypeResponseDetailsVM } from '../models/types/TypeResponseDetailsVM';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor(private baseService: BaseService) { }

  get(action: string){
      return this.baseService.get<TypeResponseDetailsVM>(environment.Api.Main.Url + action);
  }
}
