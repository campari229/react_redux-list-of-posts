import React from 'react';
import { FullPost } from '../../Interfaces/Interfaces';
import { UserInfo } from '../UserInfo/UserInfo';
import { CommentsList } from '../CommentsList/CommentsList';

import { useDispatch } from 'react-redux';
import { removePost } from '../../store/index';

import './Post.scss';

type Props = {
  post: FullPost;
};

export const Post: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch()

  return (
    <>
      <div className="post">
        <div className="post__user user">
          <UserInfo userData={post.user} />
        </div>
        <div className="post__info">
          <h3 className="post__title">
            {post.title}
          </h3>
          <p className="post__text">
            {post.body}
          </p>
        </div>
        <button onClick={() => dispatch(removePost(post.id))} className="post-btn">remove post</button>
      </div>
      <CommentsList comments={post.comments} postId={post.id} />
    </>
  );
}
