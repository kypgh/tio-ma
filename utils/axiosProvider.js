import axios from "axios";
import { NEXT_PUBLIC_BACKEND_API_URL } from "../config/enums";

export const refreshAccessToken = async (
  accessToken,
  url = `${NEXT_PUBLIC_BACKEND_API_URL}/membersArea/auth/token`
) => {
  const res = await axios.post(url, {
    accessToken,
  });
  return res.data.jwt;
};

export const getInstance = (
  token,
  refreshToken,
  setToken = () => {},
  setRefreshToken = () => {},
  baseURL = NEXT_PUBLIC_BACKEND_API_URL,
  refreshAccessTokenURL = `${NEXT_PUBLIC_BACKEND_API_URL}/membersArea/auth/token`
) => {
  let instance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  instance.interceptors.response.use(undefined, async (error) => {
    if (error.response.data.code === 66) {
      return refreshAccessToken(refreshToken, refreshAccessTokenURL)
        .then((res) => {
          setToken(res);
          error.config.headers["Authorization"] = "Bearer " + res;
          error.config.baseURL = undefined;
          return instance.request(error.config);
        })
        .catch((err) => {
          console.error("Failed to refresh token");
          setToken("");
          setRefreshToken("");
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  });
  return instance;
};
