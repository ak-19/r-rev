import {
  OWNER_GET_REVIEWS,
  OWNER_GET_RESTAURANTS,
  OWNER_CREATE_NEW_RESTAURANT,
  OWNER_CLEAR_DONE,
  OWNER_GET_SINGLE_RESTAURANT_BY_ID,
} from "../actions/types";

const initialState = {
  restaurants: [],
  restaurant: {},
  done: false,
  reviews: [],
  replyDone: false,
  msg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OWNER_GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      };
    case OWNER_CREATE_NEW_RESTAURANT:
      return {
        ...state,
        done: action.payload,
      };
    case OWNER_CLEAR_DONE:
      return {
        ...state,
        done: false,
      };
    case OWNER_GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        replyDone: false,
      };
    case OWNER_GET_SINGLE_RESTAURANT_BY_ID:
      return {
        ...state,
        restaurant: action.payload,
      };
    default:
      return state;
  }
}
