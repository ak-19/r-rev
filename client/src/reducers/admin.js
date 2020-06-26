import {
  ADMIN_GET_RESTAURANTS,
  ADMIN_GET_ACCOUNTS,
  ADMIN_UPDATE_ACCOUNT,
  ADMIN_UPDATE_RESTAURANT,
  ADMIN_GET_REVIEWS,
  ADMIN_UPDATE_REVIEW,
} from "../actions/types";

const initialState = {
  restaurants: [],
  reviews: [],
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_GET_ACCOUNTS:
      return {
        ...state,
        users: action.payload,
      };
    case ADMIN_UPDATE_ACCOUNT:
      return { ...state };
    case ADMIN_GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      };
    case ADMIN_UPDATE_RESTAURANT:
      return { ...state };
    case ADMIN_GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case ADMIN_UPDATE_REVIEW:
      return { ...state };
    default:
      return state;
  }
}
