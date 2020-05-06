<template>
  <div>
    <h1>Category: {{category.name}}</h1>
    <v-container fluid>
      <p>{{ selected }}</p>
      <div v-for="item in items" :key="item.id">
        <v-checkbox
          v-model="selected"
          :id="item.id"
          :name="item.name"
          :label="item.name"
          :value="item.id"
        ></v-checkbox>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "CategoryItems",
  data: () => ({
    category: {},
    selected: []
  }),
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  created() {
    console.log("CategoryItems Created");
    this.category = { ...this.getCategoryById(this.id) };
    this.getItems();
    console.log(this.id);
    console.log(this.category);
  },
  mounted() {
    console.log("CategoryItems mounted");
  },
  methods: {
    ...mapActions(["getItemsAction"]),
    async getItems() {
      try {
        await this.getItemsAction();
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters(["getCategoryById", "getAllItems"]),
    ...mapState(["items"])    
  }
};
</script>

<style lang="scss" scoped>
</style>