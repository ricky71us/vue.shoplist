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
                    <v-icon color="red" dark v-on="on" @click="deleteStore(store.id)">mdi-delete</v-icon>
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
import axios from "axios";
import savestore from "@/components/SaveStore.vue";
import editstore from "@/components/EditStore.vue";

export default {
  name: "BaseManageStores",

  components: {
    savestore,
    editstore
  },
  data() {
    return {
      stores: null,
      store: {
        id: 0,
        name: null,
        shortName: null,
        description: null
      },
      updateStore: {
        id: 0,
        name: null,
        shortName: null,
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
    this.getStores();
  },

  methods: {
    getStores: function() {
      axios
        .get("http://phpapi.bmgtech.ca/index.php/api/stores")
        .then(response => (this.stores = response.data));
    },
    deleteStore: function(index) {
      //console.log(index);
      if (confirm("Do you really want to delete?")) {
        axios
          .delete("http://phpapi.bmgtech.ca/index.php/api/stores?id=" + index)
          .then(() => {
            //console.log(this.stores);
            //console.log(this.stores.findIndex(x => x.id === index));
            this.stores.splice(
              this.stores.findIndex(x => x.id === index),
              1
            );
          })
          .catch(() => {
            //console.log(());
          });
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
        axios
          .put(
            "http://phpapi.bmgtech.ca/index.php/api/stores?id=" +
              this.updateStore.id,
            this.updateStore
          )
          .then(() => {
            this.updateStore = this.store;
          })
          .catch(() => {});
      } else {
        axios
          .post(
            "http://phpapi.bmgtech.ca/index.php/api/stores",
            this.updateStore
          )
          .then(() => {
            this.getStores();
            this.updateStore = this.store;
          })
          .catch(() => {});
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};
</script>
