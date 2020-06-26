import validator from "validator";

const restaurantValidator = (errors, data) => {
  const { name, ownerId } = data;

  if (!name || validator.isEmpty(name)) {
    errors.message = "Name of restaurant is required";
    return false;
  }

  if (!ownerId || validator.isEmpty(ownerId)) {
    errors.message = "Owner id of restaurant is required";
    return false;
  }

  return true;
};

export { restaurantValidator };
