import axios from "axios";
import { VISITOR_GET_RESTAURANTS, VISITOR_GET_SINGLE_RESTAURANT_BY_ID, ERRORS } from "./types";

export const getRestaurants = () => {
  return async (dispatch) => {
    try {
      const { data: payload } = await axios.get("/api/visitor/restaurants");
      dispatch({ type: VISITOR_GET_RESTAURANTS, payload });
    } catch (e) {
      const { username, password, msg } = e.response.data;
      const payload = msg || username || password;
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const getSingleRestaurantByID = (id) => {
  return async (dispatch) => {
    try {
      const { data: payload } = await axios.get("/api/visitor/restaurants/" + id);
      dispatch({ type: VISITOR_GET_SINGLE_RESTAURANT_BY_ID, payload });
    } catch (e) {
      const { username, password, msg } = e.response?.data;
      const payload = msg || username || password;
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const updateSingleRestaurantByID = (id, updateData, history) => {
  return async (dispatch) => {
    try {
      await axios.put("/api/visitor/restaurants/" + id, updateData);
      const { data: payload } = await axios.get("/api/visitor/restaurants");
      dispatch({ type: VISITOR_GET_RESTAURANTS, payload });
      history.push("/visitor");
    } catch (e) {
      const { message: payload } = e.response?.data;
      dispatch({ type: ERRORS, payload });
    }
  };
};
