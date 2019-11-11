//Controller Import
import { safePush } from "@/controllers/user/navigation";

//Schema Imports
import { CountryDocument } from "@/models/country/schema";
import {
  EstablishmentDocument,
  EstablishmentCollection
} from "@/models/establishment/schema";
import { UserDocument } from "@/models/user/schema";

//Data Imports
import { CountryData } from "@/models/country/data";
import {
  EstablishmentData,
  EstablishmentEmployee
} from "@/models/establishment/data";

//goToDetails
export const goToDetails = (establishment_id: string) => {
  safePush("admin_establishment_detail", {
    id: establishment_id
  });
};

//Establishment Profile Data
export type EstablishmentProfile = null | {
  name: string;
  description: string;
  phone: number;
  address: string;
  country: {
    code: number;
    iso: string;
    name: string;
    flag_url?: string;
  };
  employees: {
    managers: EstablishmentEmployee[];
    order_handlers: EstablishmentEmployee[];
    receptionists: EstablishmentEmployee[];
  };
  working_hours: { days: string[]; hours: { open: string; close: string } }[];
  reservation_limit: number;
};

//
const getEmployeeDescriptions = async (
  employees: Record<string, string[]>,
  employee_type: "manager" | "order_handler" | "receptionist"
): Promise<EstablishmentEmployee[]> => {
  return await Promise.all(
    employees[`${employee_type}_ids`].map(async (id: string) => {
      const temp = await new UserDocument(id).read();
      return {
        id,
        first_name: temp.first_name,
        last_name: temp.last_name
      };
    })
  );
};

//getData: Outputs profile data for current selected establishment.
export async function getData(
  establishment: EstablishmentDocument
): Promise<EstablishmentProfile> {
  const establishmentData: EstablishmentData = await establishment.read();
  const countryData: CountryData = await new CountryDocument(
    establishmentData.country_id
  ).read();
  const managers = await getEmployeeDescriptions(
    establishmentData.employees,
    "manager"
  );
  const order_handlers = await getEmployeeDescriptions(
    establishmentData.employees,
    "order_handler"
  );
  const receptionists = await getEmployeeDescriptions(
    establishmentData.employees,
    "receptionist"
  );
  let working_hours: Record<
    string,
    {
      days: string[];
      hours: {
        open: string;
        close: string;
      };
    }
  > = {};
  [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ].map(day => {
    const entries: Record<string, { open: string; close: string }> =
      establishmentData.working_hours;
    const id = `${entries[day].open}#${entries[day].close}`;
    if (Object.keys(working_hours).includes(id)) {
      working_hours[id].days.push(day);
    } else {
      working_hours[id] = {
        days: [day],
        hours: { open: entries[day].open, close: entries[day].close }
      };
    }
  });
  delete establishmentData.employees.manager_ids;
  delete establishmentData.employees.order_handler_ids;
  delete establishmentData.employees.receptionist_ids;
  delete establishmentData.country_id;
  delete establishmentData.menu_id;
  delete establishmentData.order_ids;
  delete establishmentData.reservation_ids;
  return {
    ...establishmentData,
    country: countryData,
    employees: {
      managers,
      order_handlers,
      receptionists
    },
    working_hours: Object.values(working_hours)
  };
}

//Create: creates a establishment
export function create(data: {
  name: string;
  description: string;
  phone: string;
  address: string;
  country_id: string;
}): void {
  const country: CountryDocument = new CountryDocument(data.country_id);
  EstablishmentCollection.create(
    data.name,
    data.description,
    parseInt(data.phone),
    data.address,
    country
  );
}
