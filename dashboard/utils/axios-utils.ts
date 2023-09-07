import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_URL });

export const request = ({ ...options }: any) => {
  client.defaults.headers.common.Authorization =
    "Bearer " + localStorage.getItem("jwtToken");

  client.defaults.headers.post["Content-Type"] = "multipart/form-data";

  client.defaults.headers.common.Authtoken = localStorage.getItem("auth-token");

  const onSuccess = (response: any) => {
    return response.data.data;
  };
  const onError = (error: AxiosError) => {
    // optionaly catch errors and add additional logging here

    if (error?.response?.status === 401) {
      // window.location.href = "/";
      toast.error("Session Expired");
    } else {
      const errors = error.response?.data?.error;

      errors.forEach((element) => {
        toast.error(element);
      });
      const toastError = error.response?.data?.error || "something went wrong";
    }
  };

  return client(options).then(onSuccess).catch(onError);
};
