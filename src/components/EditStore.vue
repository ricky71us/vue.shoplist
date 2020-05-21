<template>
  <div id="app">
    <v-form ref="form" v-model="validStore" lazy-validation>
      <v-dialog
        v-model="dialogEdit[localStore.id]"
        width="500"
        :key="localStore.id"
        :id="localStore.id"
      >
        <template v-slot:activator="{ on }">
          <v-icon
            color="primary"
            :id="localStore.id"
            dark
            v-on="on"
            @click="editStore(localStore)"
          >mdi-pencil</v-icon>
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
              @click.stop="$set(dialogEdit, localStore.id,  false)"
            >Save</v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="addNewStore"
              @click.stop="$set(dialogEdit, localStore.id,  false)"
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
import { mapState, mapActions } from "vuex";

export default {
  name: "editstore",

  props: ["updateStore"],

  computed: {
    ...mapState(["stores"]),
    localStore: {
      get: function() {        
        return this.updateStore;
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
      validStore: false,
      name: "",
      nameRules: [v => !!v || "Name is required"],
      select: null,
      checkbox: false,
      dialog: false,
      dialogEdit: []
    };
  },

  mounted() {
    //this.getStoresAction();
  },

  methods: {
    ...mapActions(["getStoresAction", "addStoreAction", "updateStoreAction"]),
    editStore: function(store) {
      this.localStore = store;
    },
    addNewStore: function() {
      //this.localStore = this.localStore;
    },
    saveStore: function() {
      if (this.localStore.id > 0) {
        this.updateStoreAction(this.localStore);
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
