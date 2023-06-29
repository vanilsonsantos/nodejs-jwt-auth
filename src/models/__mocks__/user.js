const findOne = async (user) => {
  if(user.email == 'existing@user.com') {
    const data = { 
      first_name: 'user', 
      email: "existing@user.com",
      password: "$2a$10$W.oXURK0tDMCbTTZUHflQ.omtZHQ.HKQmS5aJ/l9wWnGLjYUp7ADO" 
    };
    return {...data,...{toJSON: () => data}}
  } 
};

const create = async (user) => {
  const data = {...user,...{_id: "new_id"}};
  return {...data,...{toJSON: () => data}};
};

module.exports = {
  findOne,
  create
}