import axios from 'axios';

const baseUrl = 'https://my-expense-diary.herokuapp.com/';

const requests = {
  login: `api/users/login/`,
  register: `api/users/register/`,
};

const getService = async (method, token, id = null) => {
  let url = baseUrl.concat(requests[method]);
  if (id !== null) url.concat(id).concat('/');

  console.log('URL ' + url);
  console.log('Token ' + token);

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const postService = async (method, token, data) => {
  let url = baseUrl.concat(requests[method]);

  console.log('URL ' + url);
  console.log(data);
  console.log('Token ' + token);

  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {getService, postService};
