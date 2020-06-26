import validator from "validator";

const restaurantAdminValidator = (errors, data) => {
  const { name } = data;

  if (!name || validator.isEmpty(name)) {
    errors.message = "Name of restaurant is required";
    return false;
  }

  return true;
};

export { restaurantAdminValidator };
