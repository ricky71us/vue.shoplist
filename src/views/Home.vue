<template>
  <div class="home">
    <v-form ref="form" v-model="valid" lazy-validation></v-form>

    <v-expansion-panels focusable>
      <BaseNewCategory></BaseNewCategory>
      <v-expansion-panel v-for="category in selectedCategoryStoreItems" :key="category.id">
        <v-expansion-panel-header>
          {{category.name}}
          <div>
            <v-btn class="ma-1" small icon @click.native="deleteCategory(category)">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="text-center">
            <BaseAddNewStore :catId="category.id"></BaseAddNewStore>
          </div>
          <v-expansion-panels focusable>
            <v-expansion-panel v-for="child in category.children" :key="child.id">
              <v-expansion-panel-header>
                {{child.name}}
                <div>
                  <v-btn class="ma-1" small icon @click.native="deleteStore(child, category.id)">
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-expansion-panels focusable>
                  <v-expansion-panel v-for="subChild in child.children" :key="subChild.id">
                    <v-expansion-panel-header>
                      {{subChild.name}}
                      <div>
                        <v-btn class="ma-1" small icon>
                          <v-icon small>mdi-close</v-icon>
                        </v-btn>
                      </div>
                    </v-expansion-panel-header>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "Home",
  data: () => ({
    sticky: false,
    message: "",
    valid: false,
    chip1: true
  }),
  created() {
    this.getAllCategories();
    //this.selectedCategoryStoreItems();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "getCategoriesAction",
      "getCategoryStoresAction",
      "getStoresAction",
      "getStoreItemsAction",
      "getItemsAction",
      "deleteCategoryStoreAction"
    ]),
    async getAllCategories() {
      try {
        this.message = "getting the categories, please be patient";
        await this.getCategoryStoresAction();
        await this.getStoreItemsAction();
        await this.getCategoriesAction();
        await this.getStoresAction();
        await this.getItemsAction();
        this.message = "";
      } catch (error) {
        console.log(error);
      }
    },    
    selectItems(categoryId) {
      this.$router.push({ name: "CategoryItems", params: { id: categoryId } });
    },
    deleteCategory(category) {
      //alert(`Are you sure you want to delete this category ${category.id}`);
      let categoryStoresToDelete = [];
      this.categoryStores.forEach(catStore => {
        if (catStore.categoryId === category.id) {
          categoryStoresToDelete.push(catStore);
        }
      });
      categoryStoresToDelete.forEach(catStore => {
        this.deleteCategoryStoreAction(catStore);
      });
    },
    deleteStore(store, categoryId) {
      //alert(`Are you sure you want to delete this category ${category.id}`);      
      let categoryStoresToDelete = [];
      this.categoryStores.forEach(catStore => {
        if (catStore.storeId === store.id && catStore.categoryId === categoryId ) {
          categoryStoresToDelete.push(catStore);
        }
      });
       categoryStoresToDelete.forEach(catStore => {
         this.deleteCategoryStoreAction(catStore);
       });
    }
  },
  computed: {
    ...mapState(["categories", "categoryStores"]),
    ...mapGetters(["selectedCategoryStoreItems"])
  }
};
</script>

<style lang="postcss" scoped>
#Outer {
  margin-left: 10px;
}
#First {
  margin-left: 20px;
}
#Second {
  margin-left: 30px;
}
</style>