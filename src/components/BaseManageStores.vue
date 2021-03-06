<template>
  <div id="app">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                <savestore updateStore="this.updateStore" v-on:add-store="snackMessage"></savestore>
              </th>
              <th class="text-left">Edit</th>
              <th class="text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="store in stores" :key="store.id">
              <td>{{ store.name }}</td>
              <td>
                <editstore v-bind:updateStore="editStore(store)" v-on:update-store="snackMessage"></editstore>
              </td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon color="red" dark v-on="on" @click="deleteStore(store)">mdi-delete</v-icon>
                  </template>
                  <span>Delete Store</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-divider></v-divider>
    </v-form>
    <v-snackbar v-model="snackbar" :multi-line="multiLine">
      {{ this.message }}
      <v-btn color="red" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import savestore from "@/components/SaveStore.vue";
import editstore from "@/components/EditStore.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "BaseManageStores",

  components: {
    savestore,
    editstore
  },
  data() {
    return {
      store: {
        id: 0,
        name: null,
        description: null
      },
      updateStore: {
        id: 0,
        name: null,
        description: null
      },
      editIcon: null,
      valid: false,
      name: "",
      nameRules: [v => !!v || "Name is required"],
      select: null,
      checkbox: false,
      dialog: false,
      dialogEdit: [],
      message: null,
      multiLine: true,
      snackbar: false
    };
  },

  mounted() {
    this.getStoresAction();
  },

  methods: {
    ...mapActions([
      "getStoresAction",
      "addStoreAction",
      "updateStoreAction",
      "deleteStoreAction"
    ]),
    snackMessage: function(message) {
      this.message = message;
      this.snackbar = true;
    },
    deleteStore: function(store) {
      if (confirm(`Do you want to delete the store ${store.name}?`)) {
        this.deleteStoreAction(store);
        this.snackMessage(`Store "${store.name}" deleted successfully!`);
      }
    },
    editStore: function(store) {
      return { id: store.id, name: store.name, description: store.description };
    }
  },
  computed: {
    ...mapState(["stores"])
  }
};
</script>
