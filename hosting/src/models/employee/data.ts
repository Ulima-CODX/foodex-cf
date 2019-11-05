//Data Types
export type EmployeeData = {
  establishment_id?: string;
};
export type EmployeeRoles = {
  isManager: boolean;
  isOrderHandler: boolean;
  isReceptionist: boolean;
};
export type EmployeeProfile = {
  establishment_name?: string;
  first_name: string;
  last_name: string;
};
