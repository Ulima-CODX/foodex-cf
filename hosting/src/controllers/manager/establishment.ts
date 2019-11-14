//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Imports
import { ManagerPage, ManagerModal } from ".";

//goToDetailPage
export async function goToDetailPage() {
  Store.commit("managerController/setPage", ManagerPage.establishmentDetail);
  safePush("manager_establishment");
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
