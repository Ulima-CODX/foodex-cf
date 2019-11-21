//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Imports
import { getEmployeeDescriptions } from "@/controllers/admin/establishment";
import { ManagerPage, ManagerModal } from ".";

//Schema Imports
import { CountryDocument } from "@/models/country/schema";
import { EstablishmentDocument } from "@/models/establishment/schema";

//Data Imports
import { EstablishmentData } from "@/models/establishment/data";
import { CountryData } from "@/models/country/data";

//getData: Outputs profile data for current selected establishment.
export async function getData() {
  const establishment_id: string =
    Store.getters["userController/getUserEstablishment"];
  console.log(establishment_id);
  const establishmentData: EstablishmentData = await new EstablishmentDocument(
    establishment_id
  ).read();
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

//goToDetailPage
export async function goToDetailPage() {
  Store.commit("managerController/setPage", ManagerPage.establishmentDetail);
  safePush("manager_establishment_detail");
}

//showReservationModal
export function showReservationModal() {
  Store.commit(
    "managerController/showModal",
    ManagerModal.reservationLimitDetail
  );
}

//hideModal
export function hideModal() {
  Store.commit("managerController/showModal");
}
