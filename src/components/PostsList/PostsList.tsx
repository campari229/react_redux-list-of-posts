import React from 'react';
import { FullPost } from '../../Interfaces/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getPosts } from '../../store/index';

import { Post } from '../Post/Post';

import './PostsList.scss';

type Props = {
  posts: FullPost[];
};

export const PostsList: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const postsList = useSelector(getPosts)

  return (
    <div>
      <input
        type="textarea"
        onChange={(event) => dispatch(setFilter(event.currentTarget.value))}
        className="filter__input"
        placeholder="Search by title or body"
      />
      <ul className="posts-list">
        {postsList.map(post => (
          <li className="posts-list__item" key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};
