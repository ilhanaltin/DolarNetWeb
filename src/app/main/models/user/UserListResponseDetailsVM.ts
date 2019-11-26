import { PagingVM } from '../pagingVM';
import { UserVM } from './UserVM';

export class UserListResponseDetailsVM
{
    userList: UserVM [];
    pagingVM: PagingVM;    
}