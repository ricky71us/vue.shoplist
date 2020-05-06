<template>
  <div>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{name}}</div>
          <v-list-item-title class="headline mb-1">{{name}}</v-list-item-title>
          <v-list-item-subtitle>{{description}}</v-list-item-subtitle>
        </v-list-item-content>
        <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
      </v-list-item>
      <v-card-actions>
        <v-btn class="mx-1" fab dark small color="pink">
          <v-icon dark>mdi-heart</v-icon>
        </v-btn>
        <v-btn text>Select Categories</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "BaseStore",
  props: {
    id: String,
    name: String,
    description: String,
    store: Object
  },
  method: {
    selectStoreCategories() {
      this.$emit();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>