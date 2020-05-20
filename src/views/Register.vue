<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1>Register</h1>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          label="FirstName"
          prepend-icon="mdi-account-circle"
          v-model="firstname"
          required
          :rules="reqRule"
        />
        <v-text-field
          label="LastName"
          prepend-icon="mdi-account-circle"
          v-model="lastname"
          required
          :rules="reqRule"
        />
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          v-model="email"
          required
          :rules="reqRule"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="password"
          required
          :rules="reqRule"
        />
        <v-text-field label="Phone" prepend-icon="mdi-phone" v-model="phone" />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" v-on:click="cancel">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info" @click="validate" v-on:click="registerUser">Save</v-btn>
    </v-card-actions>
    <v-divider></v-divider>

    <!-- <v-sheet
      v-if="this.msg"
      color="orange lighten-2"
      height="80"
      elevation="10"
    >
      {{ this.msg }}
    </v-sheet>-->

    <v-snackbar v-model="isMsg" :bottom="true" :right="true" :timeout="4000">
      {{ this.msg }}
      <!-- <v-btn color="pink" text @click="snackbar = false">Close</v-btn> -->
    </v-snackbar>
  </v-card>
</template>
<script>
//import axios from "axios";
import { mapActions } from "vuex";
import { dataService } from "../shared";

export default {
  data() {
    return {
      posts: [],
      errors: [],
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      errorflag: false,
      msg: "",
      isMsg: false,
      form: {
        firstname: "",
        email: ""
      },
      showPassword: false,
      reqRule: [v => !!v || "Required"],
      valid: false
    };
  },

  methods: {
    ...mapActions(["registerAction"]),

    async registerUser() {
      this.msg = "";
      this.$refs.form.validate();
      if (this.valid) {
        var data = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          phone: this.phone
        };
        console.log("inside");
        await dataService.register(data).then(response => {
          this.msg = response.message;
          this.isMsg = !(this.msg === "");
          console.log(this.msg.length);
        });
      }
    },
    submit() {
      console.log("submit!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    checkForm: function(e) {
      if (this.firstname && this.email) {
        return true;
      }

      this.errors = [];

      if (!this.firstname) {
        this.errors.push("Name required.");
      }
      if (!this.email) {
        this.errors.push("Email required.");
      }

      e.preventDefault();
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty
      };
    },
    cancel() {
      this.$router.push({ path: "login" });
    },
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>
