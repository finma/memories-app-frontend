import * as type from "../../constants/types";

const initialState = {
  isLoading: true,
  posts: [],
};

const postsReducers = (state = initialState, action) => {
  switch (action.type) {
    case type.START_LOADING:
      return { ...state, isLoading: true };
    case type.END_LOADING:
      return { ...state, isLoading: false };
    case type.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPage: action.payload.numberOfPage,
      };
    case type.FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case type.FETCH_POST:
      return { ...state, post: action.payload };
    case type.CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case type.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case type.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default postsReducers;
