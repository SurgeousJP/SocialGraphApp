import { URL_LOGIN, URL_REGISTER } from "../constants/endpoints";
import http from "../utils/http";

export const authApi = {
  register(body: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  }) {
    return http.post(URL_REGISTER, {
      ...body,
      passwordConfirm: body.confirmPassword,
    });
  },
  login(body: { username: string; password: string }) {
    return http.post(URL_LOGIN, body);
  },
};

export default authApi;
