import jwtDecode from "jwt-decode";

const getUserFromToken = () => jwtDecode(localStorage.token);

export default getUserFromToken;
