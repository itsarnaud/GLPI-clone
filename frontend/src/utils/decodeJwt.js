import { jwtDecode } from "jwt-decode";
import Cookies       from "js-cookie";

export const decodeJwt = () => {
  const jwt = Cookies.get('token_auth');
  const decoded = jwtDecode(jwt);
  return decoded;
}