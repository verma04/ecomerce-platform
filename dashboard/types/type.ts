export type Inputs = {
  email: string;
  firstName: string;
  lastName: String;
  password: string;
};

export  type InformationProduct {
  productName: String;
  category: String
  price: String;
  discountedPrice: String;
  productPerUnit: String;
  unit: String;


}
export  interface informationProduct {
  productName?: String | undefined;
  category?:String
  price?: Number | null;
  discountedPrice?: Number | null;
  productPerUnit?: string;
  unit?: String;

}

export interface inventory {
  quantity: Number | null
  sku: String
  warehouse:String

}


export  interface productInformationProps {
  productInformation: informationProduct
  setProductInformation: any
  handleNext:any
}


export  interface inventoryProps {
  inventory: inventory
  setInventory: any
  handleNext:any
}
interface variant {
  value? :string
  name? : String
}
 export interface generatedVariant {
  id:String
  variant: variant
  price: Number
   stock: Number
  discountedPrice:Number
  }
   

   export interface editVariant {
  id:String
 sku: variant
  price: Number
  stock: Number
  discountedPrice:Number
  }



export  interface variantProps {
  productInformation: informationProduct
  inventory: inventory
  variant: [variant]
  setVariant: any
  variantGenerated: any
  setVariantGenerated:any
}
export type Category = {
  title: string;
  
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

export type image = {
  name: string;
  alt: string;
  description: string;
  caption: string;
  url:String
};

export type ImageProps = {
  img: image[];
  handleNext: any
  setImg:any
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
  buttonName?: string | undefined;
  loading: Boolean
}


export interface WareHouseType {
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

 export interface userType {
  lastName: string;
   firstName: string;
   phone: String
   email: String
 }

 export interface userAddressType {

  addressLine1: string;
  addressLine2: string;
  pinCode: string;
  city: string;
   state: string;
   country:string
  
}