//Data Type recieved from Firestore
export type CountryFS_Data = {
  code: number;
  iso: string;
  name: string;
};

//Data Type used as output
export type CountryData = {
  code: number;
  iso: string;
  name: string;
  flag_url: string;
};
