import axios from 'axios';

const baseUrl = 'https://my-expense-diary.herokuapp.com/';

const requests = {
  LOGIN_API: 'api/users/login/',
  REGISTER_API: 'api/users/register/',
  CATEGORIES_API: 'api/categories/',
  TRANSACTIONS_API: '/transactions/',
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

const postService = async (method, token, data, id = null) => {
  let url = baseUrl;

  if (method === 'TRANSACTIONS_API') {
    url = url
      .concat(requests['CATEGORIES_API'])
      .concat(id)
      .concat(requests['TRANSACTIONS_API']);
  } else url = url.concat(requests[method]);

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
  } catch (err) {
    if (method !== 'LOGIN_API' && method !== 'REGISTER_API') return null;
    if (!err.response) return 'Network Error';
    const {error} = err.response.data;
    return {error};
  }
};

const putService = async (method, token, data, categoryId, transactionId) => {
  let url = baseUrl;
  if (method === 'TRANSACTIONS_API') {
    url = url
      .concat(requests['CATEGORIES_API'])
      .concat(categoryId)
      .concat(requests['TRANSACTIONS_API'])
      .concat(transactionId);
  } else url = url.concat(requests[method]).concat(categoryId);

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

const deleteService = async (method, token, categoryId, transactionId) => {
  let url = baseUrl;
  if (method === 'TRANSACTIONS_API') {
    url = url
      .concat(requests['CATEGORIES_API'])
      .concat(categoryId)
      .concat(requests['TRANSACTIONS_API'])
      .concat(transactionId);
  } else url = url.concat(requests[method]).concat(categoryId);

  console.log({url});
  console.log({categoryId});
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
