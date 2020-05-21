<template>
  <div id="app">
    <v-form ref="form" v-model="validStore" lazy-validation>
      <v-dialog v-model="dialogStore" width="500" :key="store.id" :id="store.id">
        <template v-slot:activator="{ on }">
          Name <v-icon color="primary" dark v-on="on" @click="newStore(store)">mdi-plus mdi-24px</v-icon>(Add New Store)
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
    </v-form>
  </div>
</template>

<script>
//import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "savestore",

  props: ["updateStore"],

  computed: {
    ...mapState(["stores"]),
    localStore: {
      get: function() {
        return { somevalue: this.updateStore };
      },
      set: function(newValue) {
        (this.id = newValue.id),
          (this.name = newValue.name),          
          (this.description = newValue.description);
      }
    }
  },
  data() {
    return {      
      store: {
        id: 0,
        name: null,        
        description: null
      },
      valid: false,
      name: "",
      nameRules: [v => !!v || "Name is required"],
      dialog: false,
      dialogEdit: [],
      validStore: false,
      dialogStore: false
    };
  },
  
  methods: {
    ...mapActions(["getStoresAction", "addStoreAction", "updateStoreAction"]),
    newStore: function(store) {
      this.localStore = store;
    },
    addNewStore: function() {
      //this.localStore = this.store;
    },
    saveStore: function() {      
        this.addStoreAction(this.localStore);
        this.$emit('add-store', `Store '${this.localStore.name}' added successfully!`);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};
</script>
