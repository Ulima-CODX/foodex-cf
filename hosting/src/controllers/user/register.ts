//Plugin Imports
import { auth, FS_User } from "@/plugins/firebase";
import Store from "@/plugins/vuex";

//Schema Import
import { CountryCollection, CountryDocument } from "@/models/country/schema";

//Data Import
import { CountryData } from "@/models/country/data";
import { UserCollection } from "@/models/user/schema";
import { EmployeeCollection } from "@/models/employee/schema";

//getCountries: Outputs data for all countries for selection
export async function getCountries(): Promise<
  { id: string; data: CountryData }[]
> {
  return await CountryCollection.read();
}

//Register function
export function register(data: {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone: string;
  country_id: string;
}): void {
  if (data.password != data.confirm_password) {
    alert("Passwords do not match!");
  } else {
    Store.commit("setAuthStatus", "login_start");
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async res => {
        if (!res.user) return;
        const user_id = res.user.uid;
        const country = new CountryDocument(data.country_id);
        UserCollection.create(
          user_id,
          data.first_name,
          data.last_name,
          data.email,
          parseInt(data.phone),
          country
        );
        EmployeeCollection.create(user_id);
      })
      .catch(err => {
        Store.commit("setAuthStatus", "login_fail");
        console.log(err);
      });
  }
}
