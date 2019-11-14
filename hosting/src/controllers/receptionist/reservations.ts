//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Imports
import { ReceptionistPage, ReceptionistModal } from ".";

//Schema Import
import { EstablishmentDocument } from "@/models/establishment/schema";
import { ReservationDocument } from "@/models/reservation/schema";

//Data Import
import { EstablishmentData } from "@/models/establishment/data";
import { ReservationData } from "@/models/reservation/data";

//goToList
export async function goToListPage() {
  const establishment_id: string =
    Store.getters["userController/getUserEstablishment"];
  const establishment_data: EstablishmentData = await new EstablishmentDocument(
    establishment_id
  ).read();
  let reservationList: {
    id: string;
    data: ReservationData;
  }[] = [];
  Promise.all(
    establishment_data.reservation_ids.map(async (reservation_id: string) => {
      reservationList.push({
        id: reservation_id,
        data: await new ReservationDocument(reservation_id).read()
      });
    })
  ).then(() => {
    Store.commit("receptionistController/setReservationList", reservationList);
    Store.commit(
      "receptionistController/setPage",
      ReceptionistPage.reservationList
    );
    safePush("receptionist_reservations");
  });
}

//showDetailModal
export function showDetailModal() {
  Store.commit(
    "receptionistController/setModal",
    ReceptionistModal.reservationDetail
  );
}
//hideDetailModal
export function hideDetailModal() {
  Store.commit("receptionistController/setModal");
}
