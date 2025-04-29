import axios    from "axios";
import Cookies  from "js-cookie";

export const API_REQUEST = async (url, data, method) => {
  const jwt = Cookies.get('token_auth');
  const config = { 
    method, 
    url,
    data,
    headers: {
      'Authorization': jwt ? `Bearer ${jwt}` : '',
      'Content-Type': 'application/json',
    }
  };

  const response = await axios(config);
  return response
};