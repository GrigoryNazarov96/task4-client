import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });
    return data.data.user;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const signUpUser = async (name, email, password) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
      name,
      email,
      password,
    });
    return data.data.newUser;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    return data.data.users;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const deleteUsers = async (users) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/users`, {data:{users}});
};

export const changeUsersStatus = async (ids, isBlock) => {
  await axios.patch(`${process.env.REACT_APP_API_URL}/users`, { users: ids, isBlock });
};
