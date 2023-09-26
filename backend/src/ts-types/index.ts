import { type } from "os";

export interface seller {
  email: string;
  name: string;
  password: string;
  token: string;
  id: string;
  firstName: string;
  lastName: string;
}

export interface email {
  email: string;
  subject: string;
  content: string;
}

export interface sellerProfile {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  category: string;
  token: string;
  sellerLogo: string;
}

export interface images {
  url: string;
  description: string;
  caption: string;
  alt: string;
  id: string;
  file: any;
}

export interface sellerAddress {
  addressLine1: string;
  addressLine2: string;
  landMark: string;
  state: string;
  city: string;
  pinCode: string;

  country: string;
}

export interface sellerBankAccount {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}

export interface sellerCategory {
  title: string;
  description: string;
  categoryImage: string;
  category: string;
  subCategory: string;
}

export interface sellerProduct {
  productName: string;
  brandName: string;
  productCategory: string;
  productImage: string;
}

export interface sellerBankAccount {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  isPrimary: string;
}

export interface sellerWareHouse {
  id: string;
  wareHouseName: string;
  contactPerson: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
  city: string;
  state: string;
  gstIn: string;
}
