const findOne = async (user) => {
  if(user.email == 'existing@user.com') return { first_name: 'user', email: "existing@user.com" };
};

const create = async (user) => {
  return {...user,...{_id: "new_id", toJSON: () => user}};
};

module.exports = {
  findOne,
  create
}