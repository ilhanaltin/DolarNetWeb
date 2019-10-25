import { TypeResponseDetailsVM } from './../Models/Types/TypeResponseDetailsVM';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor(private baseService: BaseService) { }

  get(action: string){
      return this.baseService.get<TypeResponseDetailsVM>(environment.apiURL + action);
  }
}
