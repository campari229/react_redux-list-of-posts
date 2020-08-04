import React from 'react';
import './App.scss';

import { useDispatch, useSelector } from 'react-redux';
import {
  getPosts,
  loadingStatus,
  isLoadedStatus,
} from './store/index';
import { loadPosts } from './helpers/thunk';
import { PostsList } from './components/PostsList/PostsList';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const fullPosts = useSelector(getPosts);
  const isLoading = useSelector(loadingStatus);
  const isLoaded = useSelector(isLoadedStatus);

  return (
    <div className="App">
      {
        isLoaded
          ? <PostsList posts={fullPosts} />
          : (
            <button
              className="btn"
              type="button"
              onClick={() => dispatch(loadPosts())}
              disabled={isLoading}
            >
              {`${isLoading ? 'Loading...' : 'Load'}`}
            </button>
          )
      }
    </div>
  );
};

export default App;
