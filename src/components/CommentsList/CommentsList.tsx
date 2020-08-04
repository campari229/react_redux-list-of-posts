import React from 'react';
import { CommentInterface } from '../../Interfaces/Interfaces';

import { Comment } from '../Comment/Comment';

import './CommentsList.scss';

type Props = {
  comments: CommentInterface[];
  postId: number;
};

export const CommentsList: React.FC<Props> = ({ comments, postId }) => (
  <ul className="comments-list">
    {comments.map(comment => (
      <li key={comment.id} className="comment-list__item comment">
        <Comment comment={comment} postId={postId} />
      </li>
    ))}
  </ul>
);
