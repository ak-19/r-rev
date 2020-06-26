const toAdminTypeUsersArray = (users) => {
  return users.map((user) => {
    const { id, email, type, data } = user;
    return {
      id,
      email,
      type,
      data,
    };
  });
};

export { toAdminTypeUsersArray };
