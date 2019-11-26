import { PagingVM } from '../pagingVM';
import { UserVM } from './userVM';

export class UserListResponseDetailsVM
{
    userList: UserVM [];
    pagingVM: PagingVM;    
}