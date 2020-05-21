<template>
  <div>
    <div>
      <v-dialog v-model="dialogStore" width="500" :key="store.id" :id="store.id">
        <template v-slot:activator="{ on }">
          <v-btn left class="ma-2" @click.native.stop v-on="on">Add Category</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>New Categories</v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-autocomplete
                v-model="el"
                :items="this.getNewCategories(categoryStores)"
                item-text="name"
                item-value="id"
                chip
                return-object
                multiple
              ></v-autocomplete>
            </v-container>
            <v-btn
              :disabled="!validStore"
              color="success"
              @click="addStoresToCategory()"
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "BaseAddCategory",
  data() {
    return {
      
      el: [],
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
      dialogStore: false,
      categoryStore: []
    };
  },

  computed: {
    ...mapState(["categories", "categoryStores"]),
    getNewCategories: state => el => {
      let selectedCategories = el      
      .map(cat => cat.categoryId);
      return state.categories.filter(
        a => selectedCategories.indexOf(a.id) === -1
      );
    }
  },
  methods: {
    ...mapActions(["addCategoryStoreAction"]),
    remove(item) {
      const index = this.el.indexOf(item.name);
      if (index >= 0) this.el.splice(index, 1);
    },
    addStoresToCategory() {
      this.el.forEach(item => {
        this.addCategoryStoreAction({
          categoryId: item.id,
          storeId: 0
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>