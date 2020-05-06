<template>
  <div>
    <v-banner single-line :sticky="sticky">
      <v-snackbar v-show="this.message">{{this.message}}</v-snackbar>
      <template v-slot:actions>
        <v-container>
          <v-row>
            <v-col cols="6" v-for="item in items" :key="item.id">
              <h1>{{ item.name }}</h1>
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
    console.log("Items Created");
    this.getAllItems();
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    ...mapActions(["getItemsAction"]),
    async getAllItems() {
      try {
        this.message = "getting the items, please be patient";
        await this.getItemsAction();
        this.message = "";
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapState(["items"])
  }
};
</script>
