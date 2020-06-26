import validator from "validator";

const reviewValidator = (errors, data) => {
  const { reply } = data;

  if (!reply) {
    errors.message = "Reply can not be empty";
    return false;
  }

  return true;
};

export { reviewValidator };
