<template>
  <v-app>
    <BaseHeader></BaseHeader>
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <span class="mr-2" v-if="this.getUserName">Welcome {{ this.getUserName }}</span>
      <v-spacer></v-spacer>
      <v-btn color="info" v-on:click="signInUser()">Login</v-btn>
      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "App",

  components: {},

  methods: {
    ...mapActions(["signInAction"]),
    async signInUser() {
      var userInfo = {
        email: "bhupathy4444@yahoo.com",
        password: "test"
      };
      await this.signInAction(userInfo);
      console.log(this.currentUser);
      // if (this.currentUser !== null || this.currentUser === undefined)
      //   this.$router.push({ path: '/dashboard' });
      // else this.msg = 'Invalid Credentials';
    },
    register() {
      this.$router.push({ path: "register" });
    }
  },
  computed: {
    ...mapState({ currentUser: "user" }),
    ...mapGetters(["getUserName"])
  }
};
</script>
