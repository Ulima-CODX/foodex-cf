<template>
  <div id="employee-register">
    <p>{{ form_prompt }}</p>
    <div>
      <label for="first_name">{{ first_name_prompt }}</label>
      <input v-model="first_name" id="first_name" />
    </div>
    <div>
      <label for="last_name">{{ last_name_prompt }}</label>
      <input v-model="last_name" id="last_name" />
    </div>
    <div>
      <label for="email">{{ email_prompt }}</label>
      <input v-model="email" id="email" />
    </div>
    <div>
      <label for="password">{{ password_prompt }}</label>
      <input v-model="password" id="password" />
    </div>
    <div>
      <label for="phone">{{ phone_prompt }}</label>
      <input v-model="phone" id="phone" />
    </div>
    <div>
      <button v-on:click="register">{{ register_prompt }}</button>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../../firestore";

export default {
  name: "EmployeeRegister",
  data: () => ({
    form_prompt: "Registrarse",
    first_name_prompt: "Nombres",
    first_name: "",
    last_name_prompt: "Apellidos",
    last_name: "",
    email_prompt: "Correo",
    email: "",
    password_prompt: "Contraseña",
    password: "",
    phone_prompt: "Teléfono",
    phone: "",
    register_prompt: "Registro"
  }),
  methods: {
    register: function() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          db.collection("employees")
            .doc(res.user.uid)
            .set({
              first_name: this.first_name,
              last_name: this.last_name,
              email: this.email,
              password: this.password,
              phone: this.phone
            });
        })
        .catch(error => {
          alert(error.message);
        })
        .finally(() => {
          this.first_name = "";
          this.last_name = "";
          this.email = "";
          this.password = "";
          this.phone = "";
        });
    }
  }
};
</script>

<style></style>
