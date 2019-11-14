//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Imports
import { ManagerPage, ManagerModal } from ".";

//Schema Import
import { EstablishmentDocument } from "@/models/establishment/schema";
import { MenuDocument } from "@/models/menu/schema";
import { DishCollection, DishDocument } from "@/models/dish/schema";

//Data Import
import { EstablishmentData } from "@/models/establishment/data";
import { MenuData } from "@/models/menu/data";
import { DishData } from "@/models/dish/data";

//goToDetailPage
export async function goToDetailPage(){
    Store.commit("")
}