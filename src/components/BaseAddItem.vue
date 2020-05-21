<template>
  <div>
    <div>
      <v-dialog v-model="dialogStore" width="500" :key="item.id" :id="item.id">
        <template v-slot:activator="{ on }">
          <v-btn left class="ma-2" @click.native.stop v-on="on">Add Item(s)</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>New Item</v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-autocomplete
                v-model="el"
                :items="this.getNewStores(catStoreItems, this.catStoreId)"
                item-text="name"
                item-value="id"
                chip
                return-object
                multiple
              ></v-autocomplete>
            </v-container>

            <v-btn
              :disabled="!validItem"
              color="success"
              @click="addStoreItems(catStoreId)"
              class="mr-4"
              @click.stop="dialogStore = false"
            >Save</v-btn>

            <v-btn
              :disabled="!validItem"
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
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "BaseAddItem",
  props: {    
    catStoreId: String
  },
  data() {
    return {
      el: [],
      item: {
        id: 0,
        name: null,        
        description: null
      },      
      valid: false,      
      validItem: true,
      dialogStore: false,

    };
  },

  methods: {
    ...mapActions(["addStoreItemsAction"]),    
    addStoreItems(catStoreId) {
      this.el.forEach(item => {
        this.addStoreItemsAction({
          catstoreId: catStoreId,
          itemId: item.id
        });
      });
      this.el = [];
    }
  },
  computed: {
    ...mapState(["items", "categories", "catStoreItems"]),
    ...mapGetters(["getCatStore"]),
    getNewStores: state => (el, catStoreId) => {
      //console.log(el)
      let selectedItems = el
        .filter(c => c.catstoreId === catStoreId)
        .map(cat => cat.itemId);
      return state.items.filter(a => selectedItems.indexOf(a.id) === -1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>