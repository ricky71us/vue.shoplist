<template>
  <div>
    <v-dialog v-model="dialogStore" width="500" :key="store.id" :id="store.id">
      <template v-slot:activator="{ on }">
        <v-btn fab max-width="75" white small icon left @click.native.stop v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Add Stores</v-card-title>
        <v-card-text>
          <v-container fluid>
            <p>{{ el }}</p>
            <!-- <div v-for="store in stores" :key="store.id">
              <v-checkbox
                  :value="store.id"
                  :key="store.id"
                  :label="store.name"
                  v-model="el"
                ></v-checkbox>
            </div>-->
            <!-- <v-list-item v-for="(store) in stores" :key="store.id">
              <v-list-item-content> 
                <v-checkbox
                  :value="store.id"
                  :key="store.id"
                  :label="store.name"
                  v-model="el"
                ></v-checkbox>
              </v-list-item-content>
            </v-list-item>-->

            <v-autocomplete v-model="el" :items="stores" 
            item-text="name" 
            item-value="id"
            chip
            return-object 
            multiple></v-autocomplete>
          </v-container>          
          <v-btn
            :disabled="!validStore"
            color="success"
            class="mr-4"
            @click.stop="dialogStore = false"
          >Save</v-btn>

          <v-btn
            :disabled="!validStore"
            color="info"
            class="mr-4"
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
import { mapState } from "vuex";
export default {
  name: "BaseTest",
  data() {
    return {
      el: [],
      store: {
        id: 0,
        name: null,
        shortName: null,
        description: null
      },
      localStore: {
        id: 0,
        name: null,
        shortName: null,
        description: null
      },
      valid: false,
      nameRules: [v => !!v || "Name is required"],
      validStore: true,
      dialogStore: false
    };
  },

  computed: {
    ...mapState(["stores"])
  },
  methods: {
    remove(item) {
      const index = this.el.indexOf(item.name);
      if (index >= 0) this.el.splice(index, 1);
    },
    addStoresToCategory() {}
  }
};
</script>

<style lang="scss" scoped>
</style>