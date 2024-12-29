import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { URL_BASE } from "../constants/endpoints";
class Http {
  //private accessToken: string;
  // private refreshToken: string;
  // private refreshTokenRequest: Promise<string> | null;
  public instance: AxiosInstance;

  constructor() {
    // this.refreshToken = getRefreshTokenFromLS();
    // this.refreshTokenRequest = null;

    this.instance = axios.create({
      baseURL: URL_BASE,
      timeout: 50000,
      headers: {
        "Content-Type": "application/json",
      },
      //withCredentials: true
    });

    this.instance.interceptors.request.use(
      (config) => {
        // this.accessToken = "abc";
        // if (this.accessToken && config.headers) {
        //   config.headers.Authorization = `Bearer ${this.accessToken}`;
        //   console.log(config.headers);
        //   console.log(config.data);
        // }
        return config;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          toast.error("Some things wrong!");
        }
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        console.log("response", response);
        // const { url } = response.config;
        // if (url === URL_LOGIN || url === URL_REGISTER) {
        //   const data = response.data as AuthResponse;
        //   this.accessToken = data.token;
        //   // this.refreshToken = response.data.data.refresh_token;
        // } else if (url === URL_LOGOUT) {
        //   this.accessToken = "";
        // }
        return response;
      },
      (error: AxiosError) => {
        console.log("error", error);

        // if (
        //   error.response?.status === HttpStatusCode.Unauthorized &&
        //   error.response?.config.url !== URL_LOGIN
        // ) {
        //   toast.error(
        //     "Your session has expired. Please log in again to continue."
        //   );
        //   // navigate to login page with a query name redirect to redirect back to the current page
        //   const redirect = window.location.pathname;
        //   window.location.href = `/login?redirect=${redirect}`;
        //   // window.location.href = "/login";
        //   //window.location.reload();
        // }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
