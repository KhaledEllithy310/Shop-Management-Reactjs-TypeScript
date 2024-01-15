export interface IFormFields {
  shopName: string;
  shopCode: string;
  phoneNumber: string;
}

export interface IFormInputs {
  name: keyof IFormFields;
  label: string;
  type: string;
}

export interface IShop {
  shopName: string;
  shopCode: string;
  phoneNumber: string;
}
