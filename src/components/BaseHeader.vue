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
      <v-btn to="/login">Login</v-btn>
      <v-menu left bottom></v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data: () => ({
    items: [
      { title: "Manage Categories", path: "/ManageCategories" },
      { title: "Manage Stores", path: "/ManageStores" },
      { title: "Manage Items", path: "/ManageItems" },
      { title: "About", path: "/About"}
    ]
  }),
  computed: {
    ...mapState({ currentUser: "user" }),
    ...mapGetters(["getUserName"])
  },
  methods: {}
};
</script>
