import {
  GET_USER,
  SELLER_EMAIL_REGISTRATION,
  SELLER_GOOGLE_LOGIN,
  SELLER_GOOGLE_REGISTRATION,
  SELLER_LOGIN,
  SELLER_LOGIN_PASSWORD,
} from "@/grapqhl/queries/auth";
import { useMutation, useQuery } from "@apollo/client";

export const sellerEmailRegistration = () =>
  useMutation(SELLER_EMAIL_REGISTRATION, {
    update(cache, { data: { sellerRegistration } }) {
      localStorage.setItem("key", sellerRegistration.token);
    },
  });

export const sellerGoogleRegistration = () =>
  useMutation(SELLER_GOOGLE_REGISTRATION, {
    update(cache, { data: { sellerGoogleRegistration } }) {
      localStorage.setItem("key", sellerGoogleRegistration.token);
    },
  });

export const sellerLogin = () => useMutation(SELLER_LOGIN, {});

export const sellerLoginWithPassword = () =>
  useMutation(SELLER_LOGIN_PASSWORD, {
    update(cache, { data: { sellerLoginWithPassword } }) {
      localStorage.setItem("key", sellerLoginWithPassword.token);
    },
  });

export const sellerGoogleLogin = () =>
  useMutation(SELLER_GOOGLE_LOGIN, {
    update(cache, { data: { sellerGoogleLogin } }) {
      localStorage.setItem("key", sellerGoogleLogin.token);
    },
  });

export const useGetUser = () => useQuery(GET_USER);
