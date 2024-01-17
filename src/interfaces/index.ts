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
  id: string;
  shopName: string;
  shopCode: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  phoneNumber: string;
}
