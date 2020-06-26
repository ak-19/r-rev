import validator from "validator";

const reviewVisitorValidator = (errors, data) => {
  const { rating } = data;

  if (!rating) {
    errors.message = "Rating can not be empty";
    return false;
  }

  return true;
};

export { reviewVisitorValidator };
