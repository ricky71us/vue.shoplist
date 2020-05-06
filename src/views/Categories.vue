<template>
  <v-banner single-line :sticky="sticky">
    <v-snackbar>{{this.message}}</v-snackbar>
    

    <template v-slot:actions>
      <v-container>
        <v-row>
          <v-col cols="6" v-for="category in categories" :key="category.id">
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
              shaped
              raised
              hover
              color="yellow"
              elevation="100"
              @click="selectItems(category.id)"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{category.name}}</div>
                  <v-list-item-title class="headline mb-1">{{category.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-spacer />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-banner>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    sticky: false,
    message: ""
  }),
  created() {
    console.log("Categories Created");
    this.getAllCategories();
  },
  mounted() {
    console.log("Categories mounted");
  },
  methods: {
    ...mapActions(["getCategoriesAction"]),
    async getAllCategories() {
      try {
        this.message = "getting the categories, please be patient";
        await this.getCategoriesAction();
        this.message = "";
      } catch (error) {
        console.log(error);
      }
    },
    selectItems(categoryId) {
      console.log(categoryId);
      this.$router.push({ name: "CategoryItems", params: { id: categoryId } });
    }
  },
  computed: {
    ...mapState(["categories"])
  }
};
</script>

<style lang="scss" scoped>
</style>