//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from '@/plugins/router';

//Controller Import
import { OrderHandlerPage } from ".";

//Schema Imports
import { EstablishmentDocument } from "@/models/establishment/schema";
import { MenuDocument } from "@/models/menu/schema";

//Schema Imports
import { EstablishmentData } from "@/models/establishment/data";
import { MenuData } from "@/models/menu/data";

//goToMenuDetail
export async function goToMenuDetail() {
    const establishment_id: string =
    Store.getters["userController/getUserEstablishment"];
    const establishment_data: EstablishmentData = await new EstablishmentDocument(
        establishment_id
    ).read();
    
}