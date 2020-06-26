import { combineReducers } from "redux";
import authReducer from "./auth";
import visitorReducer from "./visitor";
import ownerReducer from "./owner";
import adminReducer from "./admin";
import errorReducer from "./error";

export default combineReducers({ adminReducer, authReducer, errorReducer, ownerReducer, visitorReducer });
