import { createStore, applyMiddleware, AnyAction} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { FullPost } from '../Interfaces/Interfaces';

const SET_FULL_POSTS = 'SET_FULL_POSTS';
const LOADING_TOGGLE = 'LOADING_TOGGLE';
const FILTER = 'FILTER';
const IS_LOADED = 'IS_LOADED';
const REMOVE_POST = 'REMOVE_POST';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const setPosts = (fullPosts: FullPost[]) => ({
  type: SET_FULL_POSTS,
  posts: fullPosts,
})
export const toggleLoading = () => ({ type: LOADING_TOGGLE })
export const setFilter = (inputValue: string) => ({
  type: FILTER,
  inputValue,
})
export const setIsLoaded = () => ({ type: IS_LOADED })
export const removePost = (id: number) => ({
  type: REMOVE_POST,
  postId: id,
})
export const removeComment = (postId: number, commentId: number) => ({
  type: REMOVE_COMMENT,
  commentId,
  postId,
})

export const getPosts = (state: RootState) => state.posts;
export const loadingStatus = (state: RootState) => state.isLoading;
export const isLoadedStatus = ( state: RootState ) => state.isLoaded;

export type RootState = {
  posts: FullPost[],
  allPosts: FullPost[],
  isLoading: boolean,
  isLoaded: boolean,
}

const initialState = {
  posts: [],
  allPosts: [],
  isLoading: false,
  isLoaded: false,
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_FULL_POSTS':
      return {
        ...state,
        posts: action.posts,
        allPosts: action.posts,
      }

    case 'LOADING_TOGGLE': 
      return {
        ...state,
        isLoading: !state.isLoading
      }

    case 'IS_LOADED':
        return {
          ...state,
          isLoaded: true,
        }

    case 'FILTER':
      return {
        ...state,
        posts: [...state.allPosts].filter((post: FullPost) => {
          return post.body.includes(action.inputValue) || post.title.includes(action.inputValue);
        }),
      }

      case 'REMOVE_POST':
        return {
          ...state,
          posts: [...state.posts].filter((post: FullPost) => post.id !== action.postId)
        }
      
      case 'REMOVE_COMMENT':
        let post = state.posts.find((post: FullPost) => post.id === action.postId) as unknown as FullPost
        post.comments = post.comments.filter(comment => comment.id !== action.commentId)
        return {
          ...state,
          posts: [
            ...state.posts,
            post,
          ]
        }

    default:
      return state
  }
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
