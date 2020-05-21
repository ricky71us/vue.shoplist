<template>
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
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "savestore",
  props: ["updateStore"],

  data() {
    return {
      store: {
        id: 0,
        name: null,        
        description: null
      },
      localStore: {
        id: 0,
        name: null,        
        description: null
      },
      valid: false,
      nameRules: [v => !!v || "Name is required"],
      validStore: true,
      dialogStore: false
    };
  },

  methods: {
    ...mapActions(["getStoresAction", "addStoresAction", "updateStoresAction"]),
    editStore: function(store) {
      this.localStore = store;
    },
    addNewStore: function() {
      this.localStore = this.store;
    },
    saveStore: async function() {
      if (this.localStore.id > 0) {
        await this.updateStoresAction(this.localStore);
      } else {
        await this.addStoresAction(this.localStore);
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },    
  },
  computed: {
      ...mapState(["stores", "categories"]),
      // localStore: {
      //   get: function() {
      //     return { somevalue: this.updateStore };
      //   },
      //   set: function(newValue) {
      //     (this.id = newValue.id),
      //       (this.name = newValue.name),      
      //       (this.description = newValue.description);
      //   }
      // }
    }
};
</script>

<style lang="scss" scoped>
</style>