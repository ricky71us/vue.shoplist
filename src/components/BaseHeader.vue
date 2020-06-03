<template>
  <div>
    <v-app-bar color="blue-grey accent-4" dense dark>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">
            <v-icon>mdi-hamburger</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" click>
            <v-list-item-title>
              <v-btn :to="item.path">{{ item.title }}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <!-- <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" :to="item.path" router exact>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>-->
      </v-menu>
      <v-toolbar-title>
        <v-btn to="/home">Shopping List</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" dark>mdi-account-circle</v-icon>
        </template>
        <span>{{getUserName}}</span>
      </v-tooltip>

      <v-btn v-if="!this.isUserSignedIn" to="/login">Login</v-btn>
      <v-btn v-if="this.isUserSignedIn" v-on:click="clearUser" to="/login" >Logout</v-btn>
      <v-menu left bottom></v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data: () => ({
    items: [
      { title: "Manage Categories", path: "/ManageCategories" },
      { title: "Manage Stores", path: "/ManageStores" },
      { title: "Manage Items", path: "/ManageItems" },
      { title: "About", path: "/About" }
    ],
    
  }),
  computed: {
    ...mapState({ currentUser: "user" }),
    ...mapGetters(["getUserName"])
  },
  methods: {
    ...mapActions(["clearUserAction"]),
    isUserSignedIn: function(){
      if (this.getUserName){
        return true
      }
      return false;
    },
    clearUser: function(){
      this.clearUserAction({firstname: "", lastname: "", phone:"", email:""})
    }
  }
};
</script>
