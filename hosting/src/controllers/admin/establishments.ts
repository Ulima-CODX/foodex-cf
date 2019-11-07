//Controller Import
import { safePush } from "@/controllers/user/navigation";

//goToDetails
export const goToDetails = (establishment_id: string) => {
  safePush("admin_establishment_detail", {
    id: establishment_id
  });
};
