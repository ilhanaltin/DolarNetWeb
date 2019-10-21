import { StandartResponseDetailsVM } from './../Models/User/StandartResponseDetailsVM';
import { UserVM } from './../Models/User/UserVM';
import { PagingVM } from './../Models/PagingVM';
import { ServiceResult } from './../Models/ServiceResult';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserListResponseDetailsVM } from '../Models/User/UserListResponseDetailsVM';
import { Observable } from 'rxjs';
import { LoginResponseDetailsVM } from '../Models/User/LoginResponseDetailsVM';
import { UserResponseDetailsVM } from '../Models/User/UserResponseDetailsVM';
import { RegisterResponseDetailsVM } from '../Models/User/RegisterResponseDetailsVM';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private options = { headers: this.headers };

  constructor(private httpClient : HttpClient) { }

  register() : Observable<ServiceResult<RegisterResponseDetailsVM>>{ 
    let post = { 
      UserName: 'yigityurekaltin', 
      Name: 'Yiğityürek', 
      Surname: 'ALTIN',
      Email: 'yigityurekaltin@gmail.com',
      Password: 'e44f5f0bf7a453a731217f288641ab16', 
      UserRoleId: 1,
      ProfileImageFile: `data:image/jpeg;base64,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`
    };

    let headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));
    
    let options = { headers: headerWithToken };

    return this.httpClient.post(environment.apiURL + environment.Register, JSON.stringify(post), options)
        .pipe(
          map(responseData => {
            var resp = new ServiceResult<RegisterResponseDetailsVM>();

            resp.Messages = [];
            resp.Result = new RegisterResponseDetailsVM();
            
            resp.Messages = responseData["result"]["messages"];
            resp.Status = responseData["result"]["status"];
            
            resp.Result.Email = responseData["result"]["result"]["email"];
            resp.Result.Name = responseData["result"]["result"]["name"];
            resp.Result.Surname = responseData["result"]["result"]["surname"];
            resp.Result.UserName = responseData["result"]["result"]["userName"];
            resp.Result.RoleTypeId = responseData["result"]["result"]["roleTypeId"];
            resp.Result.UserId = responseData["result"]["result"]["userId"];

            return resp;
          }));
  }

  login() { 
    let post = { UserName: 'ilhanaltin', Password: 'e44f5f0bf7a453a731217f288641ab16', RoleId: 1}            
    return this.httpClient.post(environment.apiURL + environment.Authenticate, JSON.stringify(post), this.options)
        .pipe(
          map(responseData => {
            var resp = new ServiceResult<LoginResponseDetailsVM>();

            resp.Messages = [];
            resp.Result = new LoginResponseDetailsVM();
            resp.Status = responseData["result"]["status"];
            resp.Messages = responseData["result"]["messages"];
            resp.Result.Token = responseData["result"]["result"]["token"];
            
            var _userVM = new UserVM();
            _userVM.Email = responseData["result"]["result"]["user"]["email"];
            _userVM.Name = responseData["result"]["result"]["user"]["name"];
            _userVM.Surname = responseData["result"]["result"]["user"]["surname"];
            _userVM.UserName = responseData["result"]["result"]["user"]["userName"];
            _userVM.UserStatus = responseData["result"]["result"]["user"]["userStatus"];
            _userVM.UserStatusTypeId = responseData["result"]["result"]["user"]["userStatusTypeId"];

            resp.Result.User = _userVM;

            return resp;
          }));
  }

  getAll() : Observable<ServiceResult<UserListResponseDetailsVM>>{

    let myParams = new HttpParams()
    .append('ItemCount', '10')
    .append('PageId', '1')
    .append('RoleId', '1');	

    let headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));
    
    let options = { headers: headerWithToken, params: myParams };

    return this.httpClient.get<ServiceResult<UserListResponseDetailsVM>>(environment.apiURL + environment.GetAllUser, options)
      .pipe(
        map(responseData => 
          {
            var resp = new ServiceResult<UserListResponseDetailsVM>();          

            resp.Messages = [];
            resp.Result = new UserListResponseDetailsVM();
            resp.Status = responseData["result"]["status"];

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

                _userVM.Id = element["id"];
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

  getById() : Observable<ServiceResult<UserResponseDetailsVM>>{
    
    let myParams = new HttpParams()
    .append('id', '1')

    let headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));
    
    let options = { headers: headerWithToken, params: myParams };

    return this.httpClient.get<ServiceResult<UserResponseDetailsVM>>(environment.apiURL + environment.GetById, options)
      .pipe(
        map(responseData => 
          {
            var resp = new ServiceResult<UserResponseDetailsVM>();          

            resp.Messages = [];
            resp.Result = new UserResponseDetailsVM();
            resp.Status = responseData["result"]["status"];
            resp.Messages = responseData["result"]["messages"];

            var _userVM = new UserVM();
            _userVM.Id = responseData["result"]["result"]["userVM"]["id"];
            _userVM.Email = responseData["result"]["result"]["userVM"]["email"];
            _userVM.Name = responseData["result"]["result"]["userVM"]["name"];
            _userVM.Surname = responseData["result"]["result"]["userVM"]["surname"];
            _userVM.UserName = responseData["result"]["result"]["userVM"]["userName"];
            _userVM.UserStatus = responseData["result"]["result"]["userVM"]["userStatus"];
            _userVM.UserStatusTypeId = responseData["result"]["result"]["userVM"]["userStatusTypeId"];

            resp.Result.User = _userVM;

            return resp;
          }));
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>
  {
    let post = { 
      Id: 2,
      Name: 'Çağın Deniz', 
      Surname: 'ALTIN',
      Email: 'cagindenizaltin@gmail.com',
      RoleId: 2
  };

    let headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));
    
    let options = { headers: headerWithToken };

    return this.httpClient.post(environment.apiURL + environment.UpdateUser, JSON.stringify(post), options)
        .pipe(
          map(responseData => {
            var resp = new ServiceResult<StandartResponseDetailsVM>();

            resp.Messages = [];
            resp.Result = new StandartResponseDetailsVM();
            resp.Status = responseData["result"]["status"];
            resp.Messages = responseData["result"]["result"]["messages"];

            return resp;
          }));
  }

  delete() : Observable<ServiceResult<StandartResponseDetailsVM>>
  {
    let myParams = new HttpParams()
    .append('id', '10002')

    let headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));
    
    let options = { headers: headerWithToken, params: myParams };

    return this.httpClient.delete<ServiceResult<StandartResponseDetailsVM>>(environment.apiURL + environment.DeleteUser, options)
      .pipe(
        map(responseData => 
          {
            var resp = new ServiceResult<StandartResponseDetailsVM>();          

            resp.Messages = [];
            resp.Result = new StandartResponseDetailsVM();
            resp.Status = responseData["result"]["status"];
            resp.Messages = responseData["result"]["result"]["messages"];

            return resp;
          }));
  }
}