import { PostVotesVM } from './PostVotesVM';
import { PostCommentsVM } from './PostCommentVM';
import { UserVM } from '../user/UserVM';

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