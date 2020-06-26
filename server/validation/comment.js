import validator from "validator";

const commentValidator = (errors, data) => {
  const { comment } = data;

  if (!comment || validator.isEmpty(comment)) {
    errors.comment = "comment text is required";
    return false;
  }

  return true;
};

export { commentValidator };
