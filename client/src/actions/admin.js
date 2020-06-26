import axios from "axios";
import { ADMIN_GET_REVIEWS, ADMIN_GET_RESTAURANTS, ADMIN_GET_ACCOUNTS, ADMIN_UPDATE_ACCOUNT, ERRORS } from "./types";

export const getAccountsForAdmin = () => {
  return async (dispatch) => {
    try {
      const { data: payload } = await axios.get("/api/admin/users");
      dispatch({ type: ADMIN_GET_ACCOUNTS, payload });
    } catch (e) {
      const { message: payload } = e.response.data;
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const adminDeleteAccount = (userId, history) => {
  return async (dispatch) => {
    try {
      await axios.delete("/api/admin/users/" + userId);
      history.push("/admindeleteaccountmessage/" + userId);
      const { data: payload } = await axios.get("/api/admin/users");
      dispatch({ type: ADMIN_GET_ACCOUNTS, payload });
    } catch (e) {
      const { message: payload } = e.response.data;
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const adminUpdateAccount = (userId, updateForm, history) => {
  return async (dispatch) => {
    try {
      const { data: payload } = await axios.put("/api/admin/users/" + userId, updateForm);
      history.push("/adminupdatedaccountmessage/" + userId);
      dispatch({ type: ADMIN_UPDATE_ACCOUNT, payload });
    } catch (e) {
      const { message } = e.response.data;
      const payload = { message, userId };
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const getAdminRestaurants = () => {
  return async (dispatch) => {
    try {
      const { data: payload } = await axios.get("/api/admin/restaurants");
      dispatch({ type: ADMIN_GET_RESTAURANTS, payload });
    } catch (e) {
      const { message: payload } = e.response.data;
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const adminUpdateRestaurant = (restaurantId, updateForm, history) => {
  return async (dispatch) => {
    try {
      await axios.put("/api/admin/restaurants/" + restaurantId, updateForm);
      history.push("/adminrestaurantmessage");
      const { data: payload } = await axios.get("/api/admin/restaurants");
      dispatch({ type: ADMIN_GET_RESTAURANTS, payload });
    } catch (e) {
      const { message } = e.response.data;
      const payload = { message, restaurantId };
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const adminDeleteRestaurant = (restaurantId, history) => {
  return async (dispatch) => {
    try {
      await axios.delete("/api/admin/restaurants/" + restaurantId);
      history.push("/adminrestaurantmessage");
      const { data: payload } = await axios.get("/api/admin/restaurants");
      dispatch({ type: ADMIN_GET_RESTAURANTS, payload });
    } catch (e) {
      const { message: payload } = e.response.data;
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const getReviewsForAdmin = () => {
  return async (dispatch) => {
    try {
      const { data: payload } = await axios.get("/api/admin/reviews");
      dispatch({ type: ADMIN_GET_REVIEWS, payload });
    } catch (e) {
      const { message: payload } = e.response.data;
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const deleteReviewForAdmin = (reviewerId, restaurantId, history) => {
  return async (dispatch) => {
    try {
      await axios.delete("/api/admin/reviews/" + reviewerId + "/restaurant/" + restaurantId);
      history.push("/adminreviewmessage");
      const { data: payload } = await axios.get("/api/admin/reviews");
      dispatch({ type: ADMIN_GET_REVIEWS, payload });
    } catch (e) {
      const { message } = e.response.data;
      const payload = { reviewerId, restaurantId, message };
      dispatch({ type: ERRORS, payload });
    }
  };
};

export const updateReviewForAdmin = (reviewerId, restaurantId, updateForm, history) => {
  return async (dispatch) => {
    try {
      await axios.put("/api/admin/reviews/" + reviewerId + "/restaurant/" + restaurantId, updateForm);
      history.push("/adminreviewmessage");
      const { data: payload } = await axios.get("/api/admin/reviews");
      dispatch({ type: ADMIN_GET_REVIEWS, payload });
    } catch (e) {
      const { message } = e.response.data;
      const payload = { reviewerId, restaurantId, message };
      dispatch({ type: ERRORS, payload });
    }
  };
};
