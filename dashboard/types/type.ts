export type Inputs = {
  email: string;
  firstName: string;
  lastName: String;
  password: string;
};

export type Address = {
  state: string;
  city: string;
  room: string;
  street: string;
};

export type SupplierDetails = {
  storeName: string;
  fullName: string;
};

export type imageInput = {
  name: string;
  alt: string;
  description: string;
  caption: string;
};

export type categoryInput = {
  name: string;
  alt: string;
  imageDescription: string;
};

export interface multiStep {
  handleNext: any;
}

export type PersonalInformation = {
  firstName: string;
  lastName: String;
  phone: string;
};

export type StoreKyc = {
  storeName: string;
  gstIn: String;
};

export type PinCode = {
  code: String;
};

export interface AddressType {
  addressLine1: string;
  addressLine2: string;
  landMark: string;
  state: string;
  city: string;
  pinCode: string;
  country: string;
}

export interface SellerBankAccount {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  isPrimary: string;
}
export type FormLayout {
  children: React.ReactNode;
  backUrl?: string | undefined;
  buttonName?:  string | undefined;
}
