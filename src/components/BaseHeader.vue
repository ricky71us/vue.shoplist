<template>
  <div>
    <v-app-bar color="blue-grey accent-4" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title> <v-btn to="/dashboard">Shopping List</v-btn></v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>-->

      <span class="mr-2" v-if="this.getUserName">Welcome {{ this.getUserName }}</span>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>-->
      <v-btn to="/login">Login</v-btn>
     

      <v-menu left bottom>
        <!-- <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>-->

        <!-- <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>-->
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState({ currentUser: "user" }),
    ...mapGetters(["getUserName"])
  },
  methods: {    
  }
};
</script>
