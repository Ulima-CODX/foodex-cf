<template>
  <v-card class="flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>Add New Dish</v-toolbar-title>
    </v-toolbar>
    <!--Establishment Form-->
    <v-card-text>
      <v-form>
        <!--Name-->
        <v-text-field single-line label="Name" v-model="form.name" />
        <!--Description-->
        <v-text-field
          single-line
          label="Description"
          v-model="form.description"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <!--Create Button-->
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="info"
        @click="
          create(form);
          dialog = false;
        "
        >Crear</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
//Controller Import
import { create } from "@/controllers/manager/menu";
//Schema Import
import { MenuCollection, MenuDocument } from "@/models/menu/schema";
import { DishCollection, DishDocument } from "@/models/dish/schema";

export default {
    data(){
        return{
            create,
            form: {
                name:"",
                description:""
            }
        }
    }
    
}
</script>