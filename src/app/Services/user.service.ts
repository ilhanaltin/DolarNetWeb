import { UserVM } from './../Models/User/UserVM';
import { PagingVM } from './../Models/PagingVM';
import { ServiceResult } from './../Models/ServiceResult';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserListDetailVM } from '../Models/User/UserListDetailVM';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private options = { headers: this.headers };

  constructor(private httpClient : HttpClient) { }

  login() {
    let post = { UserName: 'ilhanaltin', Password: 'e44f5f0bf7a453a731217f288641ab16', RoleId: 1}            
    return this.httpClient.post(environment.apiURL + environment.Authenticate, JSON.stringify(post), this.options)
        .pipe(map(response=>response));
  }

  getAll() : Observable<ServiceResult<UserListDetailVM>>{

    let myParams = new HttpParams()
    .append('ItemCount', '10')
    .append('PageId', '1')
    .append('RoleId', '1');	

    let headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));
    
    let options = { headers: headerWithToken, params: myParams };

    return this.httpClient.get<ServiceResult<UserListDetailVM>>(environment.apiURL + environment.UserGetAll, options)
      .pipe(
        map(responseData => 
          {
            var resp = new ServiceResult<UserListDetailVM>();          

            resp.Messages = [];
            resp.Result = new UserListDetailVM();
            
            let userVMList: UserVM[] = [];
            let pagingVM = new PagingVM();

            resp.Messages = responseData["result"]["messages"];

            pagingVM.CurrentPage = responseData["result"]["result"]["pagingVM"]["currentPage"];
            pagingVM.PageItemCount = responseData["result"]["result"]["pagingVM"]["cageItemCount"];
            pagingVM.TotalCount = responseData["result"]["result"]["pagingVM"]["totalCount"];
            pagingVM.TotalPage = responseData["result"]["result"]["pagingVM"]["totalPage"];

            resp.Result.PagingVM = pagingVM;

            responseData["result"]["result"]["userList"].forEach(element => {
                var _userVM = new UserVM();

                _userVM.Email = element["email"];
                _userVM.Name = element["name"];
                _userVM.Surname = element["surname"];
                _userVM.UserName = element["userName"];
                _userVM.UserStatus = element["userStatus"];
                _userVM.UserStatusTypeId = element["userStatusTypeId"];
                
                userVMList.push(_userVM);
            });

            resp.Result.UserList = userVMList;
            
            return resp;
          }));
  }
}