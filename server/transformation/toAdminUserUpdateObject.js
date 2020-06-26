import bcrypt from "bcryptjs";
const toAdminUserUpdateObject = (props) => {
  const updateObject = {};
  const { email, password, type } = props;
  if (email) {
    updateObject.email = email;
  }

  if (password) {
    updateObject.password = bcrypt.hashSync(password, 10);
  }

  if (type) {
    updateObject.type = type;
  }

  return updateObject;
};

export { toAdminUserUpdateObject };
