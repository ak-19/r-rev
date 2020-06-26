import { VISITOR_GET_RESTAURANTS, VISITOR_GET_SINGLE_RESTAURANT_BY_ID } from "../actions/types";

const initialState = {
  restaurants: [],
  restaurant: {},
  msg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VISITOR_GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      };
    case VISITOR_GET_SINGLE_RESTAURANT_BY_ID:
      return {
        ...state,
        restaurant: action.payload,
      };
    default:
      return state;
  }
}
