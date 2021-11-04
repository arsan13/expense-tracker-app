import axios from 'axios';

const baseUrl = 'https://my-expense-diary.herokuapp.com/';

const requests = {
  LOGIN_API: 'api/users/login/',
  REGISTER_API: 'api/users/register/',
  CATEGORIES_API: 'api/categories/',
};

const getService = async (method, token, id = null) => {
  let url = baseUrl.concat(requests[method]);
  if (id !== null) url.concat(id).concat('/');

  console.log({url});
  console.log({token});

  try {
    const res = await axios.get(url, {
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

const postService = async (method, token, data) => {
  let url = baseUrl.concat(requests[method]);

  console.log({url});
  console.log({data});
  console.log({token});

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

const putService = async (method, token, data, id) => {
  let url = baseUrl.concat(requests[method]).concat(id);

  console.log({url});
  console.log({data});
  console.log({token});

  try {
    const res = await axios.put(url, data, {
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

const deleteService = async (method, token, id) => {
  let url = baseUrl.concat(requests[method]).concat(id);

  console.log({url});
  console.log({id});
  console.log({token});

  try {
    const res = await axios.delete(url, {
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

export {getService, postService, putService, deleteService};
