<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1>Register</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="FirstName"
          prepend-icon="mdi-account-circle"
          v-model="firstname"
        />
        <v-text-field
          label="LastName"
          prepend-icon="mdi-account-circle"
          v-model="lastname"
        />
        <v-text-field label="Email" prepend-icon="mdi-email" v-model="email" />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="password"
        />
        <v-text-field label="Phone" prepend-icon="mdi-phone" v-model="phone" />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" v-on:click="cancel">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info" v-on:click="registerUser">Save</v-btn>
    </v-card-actions>
    <v-divider></v-divider>

    <v-sheet
      v-if="this.msg"
      color="orange lighten-2"
      height="80"
      elevation="10"
    >
      {{ this.msg }}
    </v-sheet>

    <!-- <v-alert v-if="this.msg" type="danger">
      {{this.msg}}
    </v-alert>-->
  </v-card>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      errors: [],
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      errorflag: false,
      msg: '',
      form: {
        firstname: '',
        email: '',
      },
      showPassword: false,
    };
  },

  methods: {
    registerUser() {
      var data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        phone: this.phone,
      };

      axios
        .post(
          'http://phpapi.bmgtech.ca/index.php/api/authentication/registration',
          data
        )
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.errorflag = false;
          //alert(response);
          this.msg = 'Successfully registered';
        })
        .catch(e => {
          //alert('err: ' + e.response.data);
          this.errorflag = true;
          this.msg = e.response.data;
          this.errors.push(e);
        });

      //alert(this.firstname);
    },
    submit() {
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING';
        setTimeout(() => {
          this.submitStatus = 'OK';
        }, 500);
      }
    },
    checkForm: function(e) {
      if (this.firstname && this.email) {
        return true;
      }

      this.errors = [];

      if (!this.firstname) {
        this.errors.push('Name required.');
      }
      if (!this.email) {
        this.errors.push('Email required.');
      }

      e.preventDefault();
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    cancel() {
      this.$router.push({ path: 'login' });
    },
  },
};
</script>
