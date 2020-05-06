<template>
  <div>
    <div>
      <v-dialog v-model="dialogStore" width="500" :key="store.id" :id="store.id">
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            max-width="75"
            white
            small
            icon
            left
            @click.native.stop
            v-on="on"
            @click="editStore(store)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Store Details</v-card-title>

          <v-card-text>
            <v-text-field
              v-model="localStore.name"
              :counter="100"
              :rules="nameRules"
              label="Store Name"
              required
            ></v-text-field>

            <v-text-field v-model="localStore.shortname" label="Short Name"></v-text-field>

            <v-text-field v-model="localStore.description" label="Description"></v-text-field>

            <v-btn
              :disabled="!validStore"
              color="success"
              class="mr-4"
              @click="saveStore()"
              @click.stop="dialogStore = false"
            >Save</v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="addNewStore"
              @click.stop="dialogStore = false"
            >Cancel</v-btn>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "savestore",

  props: ["updateStore"],

  computed: {
    localStore: {
      get: function() {
        return { somevalue: this.updateStore };
      },
      set: function(newValue) {
        (this.id = newValue.id),
          (this.name = newValue.name),
          (this.shortName = newValue.shortName),
          (this.description = newValue.description);
      }
    }
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
      valid: false,
      name: "",
      nameRules: [v => !!v || "Name is required"],
      select: null,
      checkbox: false,
      dialog: false,
      dialogEdit: [],
      validStore: false,
      dialogStore: false
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
    editStore: function(store) {
      this.localStore = store;
    },
    addNewStore: function() {
      this.localStore = this.store;
    },
    saveStore: function() {
      if (this.localStore.id > 0) {
        axios
          .put(
            "http://phpapi.bmgtech.ca/index.php/api/stores?id=" +
              this.localStore.id,
            this.localStore
          )
          .then(() => {
            this.localStore = this.store;
          })
          .catch(() => {});
      } else {
        axios
          .post(
            "http://phpapi.bmgtech.ca/index.php/api/stores",
            this.localStore
          )
          .then(() => {
            this.getStores();
            this.localStore = this.store;
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