import axios from "axios";
import {
  OWNER_GET_SINGLE_RESTAURANT_BY_ID,
  OWNER_GET_REVIEWS,
  OWNER_GET_RESTAURANTS,
  OWNER_CREATE_NEW_RESTAURANT,
  OWNER_CLEAR_DONE,
  ERRORS,
} from "./types";

export const getRestaurants = () => {
  return async (dispatch) => {
    try {
      const { data: payload } = await axios.get("api/owner/restaurants");
      dispatch({ type: OWNER_GET_RESTAURANTS, payload });
    } catch (e) {
      const { username, password, msg } = e.response.data;
      const payload = msg || username || password;
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const createNewRestaurant = (name, history) => {
  return async (dispatch) => {
    try {
      const { data: payload } = await axios.post("/api/owner/restaurants", { name });
      dispatch({ type: OWNER_CREATE_NEW_RESTAURANT, payload });
    } catch (e) {
      const { message: payload } = e.response.data;
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const clearDoneAndGoBack = (history) => {
  return async (dispatch) => {
    dispatch({ type: OWNER_CLEAR_DONE });
    history.push("/owner");
  };
};

export const getOwnerReviews = () => {
  return async (dispatch) => {
    try {
      const { data: payload } = await axios.get("/api/owner/reviews");
      dispatch({ type: OWNER_GET_REVIEWS, payload });
    } catch (e) {
      const { message: payload } = e.response.data;
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const makeOwnerReply = (reviewerId, restaurantId, reply) => {
  return async (dispatch) => {
    try {
      await axios.put("/api/owner/reviews/" + reviewerId + "/restaurant/" + restaurantId + "/reply", { reply });
      const { data: payload } = await axios.get("/api/owner/reviews");
      dispatch({ type: OWNER_GET_REVIEWS, payload });
    } catch (e) {
      const { message } = e.response.data;
      const payload = { message, reviewerId, restaurantId };
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const getSingleRestaurantByID = (id) => {
  return async (dispatch) => {
    try {
      const { data: payload } = await axios.get("/api/owner/restaurants/" + id);
      dispatch({ type: OWNER_GET_SINGLE_RESTAURANT_BY_ID, payload });
    } catch (e) {
      const { message: payload } = e.response.data;
      dispatch({ type: ERRORS, payload });
    }
  };
};
