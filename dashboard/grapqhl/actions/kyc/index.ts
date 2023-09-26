import {
  BANK_ACCOUNT,
  BUSINESS_CATEGORY,
  KYC_SELLER_PROFILE,
  KYC_STORE,
  SELLER_PROFILE,
  STORE_ADDRESS,
} from "@/grapqhl/queries/kyc";
import { useMutation, useQuery } from "@apollo/client";

export const sellerProfile = () => useQuery(SELLER_PROFILE);

export const kycSellerProfile = () => useMutation(KYC_SELLER_PROFILE, {});

export const storeKyc = () => useMutation(KYC_STORE, {});

export const sellerAddress = () => useMutation(STORE_ADDRESS, {});

export const sellerBankAccount = () => useMutation(BANK_ACCOUNT, {});

export const getBusinessCategory = () => useQuery(BUSINESS_CATEGORY);
