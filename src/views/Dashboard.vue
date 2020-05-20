<template>
  <div>
     <stores />
    <v-banner single-line :sticky="sticky">
      <v-snackbar v-show="this.message">{{this.message}}</v-snackbar>

     

      <template v-slot:actions>
        <v-container>

        <v-row>            
            <v-col cols="6" v-for="store in stores" :key="store.id">
               <BaseStore v-bind="store" />  
              <v-spacer />
            </v-col>
        </v-row>
        </v-container>
      </template>
    </v-banner>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    sticky: false,
    message: ""
  }),
  created() {
    this.getAllStores();
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    ...mapActions(["getStoresAction"]),
    async getAllStores() {
      try {
        this.message = "getting the stores, please be patient";
        await this.getStoresAction();
        this.message = "";
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapState(["stores"])
  }
};
</script>
