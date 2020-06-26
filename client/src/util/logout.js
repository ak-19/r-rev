import setAuthToken from "./setAuthToken";

const logout = () => {
  setAuthToken(false);
  localStorage.removeItem("token");
};

export default logout;
