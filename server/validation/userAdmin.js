import validator from "validator";

const userAdminValidator = (errors, data) => {
  const { email, type, password } = data;

  if (!email || !validator.isEmail(email)) {
    errors.message = "Email is not in valid format";
    return false;
  }

  if (!type || validator.isEmpty(type) || !validator.isIn(type, ["owner", "visitor", "admin"])) {
    errors.message = `Not valid type of account`;
    return false;
  }

  if (password && password.length < 4) {
    errors.message = `Password need to be at least 4 characters long`;
    return false;
  }

  return true;
};

export { userAdminValidator };
