//Data Type
export type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  country_id: string;
};

export type UserRoles = {
  isAdmin: boolean;
  isManager: boolean;
  isOrderHandler: boolean;
  isReceptionist: boolean;
  isClient: boolean;
};
