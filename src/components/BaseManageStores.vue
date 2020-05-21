<template>
  <div id="app">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Name
                <savestore updateStore="this.updateStore"></savestore>
              </th>
              <th class="text-left">Edit</th>
              <th class="text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="store in stores" :key="store.id">
              <td>{{ store.name }}</td>
              <td>
                <editstore v-bind:updateStore="store"></editstore>
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
  </div>
</template>

<script>
//import axios from "axios";
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
      dialogEdit: []
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
    deleteStore: function(store) {      
      if (confirm(`Do you want to delete the store ${store.name}?`)) {        
        this.deleteStoreAction(store);
      }
    },
    editStore: function(store) {
      this.updateStore = store;
    },
    addNewStore: function() {
      this.updateStore = this.store;
    },
    saveStore: function() {
      if (this.updateStore.id > 0) {
        this.updateStoreAction();
      } else {
        this.addStoreAction(this.updateStore);
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  computed: {
    ...mapState(["stores"])
  }
};
</script>
