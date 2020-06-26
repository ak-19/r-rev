import validator from "validator";

const userValidator = (errors, data) => {
  const { email, password } = data;

  if (!email || validator.isEmpty(email)) {
    errors.email = `email can't be empty`;
    return false;
  }

  if (!password || validator.isEmpty(password)) {
    errors.password = `Passwords can't be empty`;
    return false;
  }

  return true;
};

export default userValidator;
