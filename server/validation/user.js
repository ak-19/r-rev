import validator from "validator";

const userValidator = (errors, data) => {
  const { email, password, password2, type } = data;

  if (!email || !validator.isEmail(email)) {
    errors.message = "Email is not in valid format";
    return false;
  }

  if (!password || validator.isEmpty(password)) {
    errors.message = `Passwords can't be empty`;
    return false;
  }

  if (password.length < 4) {
    errors.message = `Password need to be at least 4 characters long`;
    return false;
  }

  if (!password || validator.isEmpty(password) || !validator.equals(password, password2)) {
    errors.message = `Passwords don't match`;
    return false;
  }

  if (!type || validator.isEmpty(type) || !validator.isIn(type, ["owner", "visitor"])) {
    errors.message = `Not valid type of account`;
    return false;
  }

  return true;
};

export { userValidator };
