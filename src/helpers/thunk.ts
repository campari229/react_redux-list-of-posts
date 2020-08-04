import {
  getData,
  PostsURL,
  UsersURL,
  CommentsURL,
} from '../api';

import {
  setPosts,
  toggleLoading,
  setIsLoaded,
} from '../store/index';

import {
  Post,
  User,
  CommentInterface,
} from '../Interfaces/Interfaces';

export const loadPosts = () => {
  return async (dispatch: (arg0: { type: string; posts?: import("../Interfaces/Interfaces").FullPost[]; }) => void) => {
    dispatch(toggleLoading());
    const users = await getData<User[]>(UsersURL);
    const posts = await getData<Post[]>(PostsURL);
    const comments = await getData<CommentInterface[]>(CommentsURL);
    const preperedPosts = posts.map((post) => ({
      ...post,
      user: users.find((user) => user.id === post.userId) as User,
      comments: comments.filter((comment) => comment.postId === post.id),
    }));

    dispatch(toggleLoading());
    dispatch(setPosts(preperedPosts));
    dispatch(setIsLoaded());
  }
}