import React from 'react';
import { CommentInterface } from '../../Interfaces/Interfaces';
import { removeComment } from '../../store/index';
import { useDispatch } from 'react-redux';

import './Comment.scss';

type Props = {
  comment: CommentInterface;
  postId: number;
};

export const Comment: React.FC<Props> = ({ comment, postId }) => {
  const dispatch = useDispatch()

  return (
    <>
      <h4 className="comment__name">{comment.name}</h4>
      <a className="comment__link" href={comment.email}>{comment.email}</a>
      <p className="comment__text">{comment.body}</p>
      <button onClick={() => dispatch(removeComment(postId, comment.id))} className="comment-btn">remove comment</button>
    </>
  );
}
