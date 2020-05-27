<template>
  <v-app>
    <BaseHeader />
    <v-content>
      <router-view />
    </v-content>    
    <BaseFooter />
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "App",

  components: {},

  methods: {
    ...mapActions(["signInAction"]),
     track () {
      this.$ga.page('/')
    },
    async signInUser() {
      var userInfo = {
        email: "bhupathy4444@yahoo.com",
        password: "test"
      };
      await this.signInAction(userInfo);      
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
