<template>
  <div id="app">
    <v-form ref="form" v-model="valid">
      <v-dialog v-model="dialogStore" width="500" :key="store.id" :id="store.id">
        <template v-slot:activator="{ on }">
          Name
          <v-icon color="primary" dark v-on="on" @click="newStore()">mdi-plus mdi-24px</v-icon>(Add New Store)
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
              :disabled="!valid"
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
import { mapState, mapActions } from "vuex";

export default {
  name: "savestore",

  props: ["updateStore"],

  computed: {
    ...mapState(["stores"]),
    localStore: {
      get: function() {
        return { id: 0, name: "", description: "" };
      },
      set: function(newValue) {
        (this.name = newValue.name), (this.description = newValue.description);
      }
    }
  },
  data() {
    return {
      store: {
        id: 0,
        name: "",
        description: ""
      },
      name: "",
      nameRules: [v => !!v || "Name is required"],
      dialog: false,
      dialogEdit: [],
      valid: false,
      dialogStore: false
    };
  },

  methods: {
    ...mapActions(["getStoresAction", "addStoreAction", "updateStoreAction"]),
    newStore: function() {
      this.localStore = { id: 0, name: "", description: "" };
      console.log(this.localStore);
    },
    addNewStore: function() {
      this.localStore = { id: 0, name: "", description: "" };
    },
    saveStore: function() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.addStoreAction(this.localStore);
        this.$emit(
          "add-store",
          `Store '${this.localStore.name}' added successfully!`
        );
      } else {
        this.dialogStore = false;
      }
    },
    validate() {
      return this.$refs.form.validate();
    }
  }
};
</script>
