import Cookies from 'js-cookie';

export const API_REQUEST = async (url, data = {}, method = 'GET') => {
  const jwt = Cookies.get('token_auth');
  const headers = {
    'Content-Type': 'application/json',
    ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
  };

  const init = { method, headers };

  if (data && !['GET', 'HEAD'].includes(method.toUpperCase())) {
    init.body = JSON.stringify(data);
  }

  const res = await fetch(url, init);
  return res;
};