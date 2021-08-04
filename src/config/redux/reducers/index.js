import { combineReducers } from "redux";
import postsReducers from "./post";
import authReducer from "./auth";

const reducer = combineReducers({ postsReducers, authReducer });

export default reducer;
