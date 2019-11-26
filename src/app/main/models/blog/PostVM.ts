import { PostVotesVM } from './postVotesVM';
import { PostCommentsVM } from './postCommentVM';
import { UserVM } from '../user/userVM';

export class PostVM{
    title: string;
    authorId: number;
    author: UserVM;
    content: string;
    postCategoryTypeId: number;
    postCategoryTypeName: string;
    postStatusTypeId: number;
    postStatusTypeName: string;
    likeCount: number;
    commentCount: number;
    postComments: PostCommentsVM[];
    postVotes: PostVotesVM[];
}