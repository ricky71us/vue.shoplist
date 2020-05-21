<template>
  <div>
    <v-dialog v-model="dialog" width="500" :key="category.id" :id="category.id">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" @click="editCategory(category)">Add New Category</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Category Details</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="updateCategory.name"
            :counter="100"
            :rules="nameRules"
            label="Category Name"
            required
          ></v-text-field>          

          <v-text-field v-model="updateCategory.description" label="Description"></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveCategory()"
            @click.stop="dialog = false"
          >Save</v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="addNewCategory"
            @click.stop="dialog = false"
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
import axios from "axios";

export default {
  name: "BaseAddNewCategory",

  data() {
    return {
      categories: null,
      category: {
        id: 0,
        name: null,        
        description: null
      },
      updateCategory: {
        id: 0,
        name: null,        
        description: null
      },
      valid: true,
      name: "",
      nameRules: [v => !!v || "Name is required"],
      select: null,
      checkbox: false,
      dialog: false,
      dialogEdit: []
    };
  },

  mounted() {
    this.getCategories();
  },

  methods: {
    getCategories: function() {
      axios
        .get("http://phpapi.bmgtech.ca/index.php/api/categories")
        .then(response => (this.categories = response.data));
    },
    deleteCategory: function(index) {      
      if (confirm("Do you really want to delete?")) {
        axios
          .delete(
            "http://phpapi.bmgtech.ca/index.php/api/categories?id=" + index
          )
          .then(() => {            
            this.categories.splice(
              this.categories.findIndex(x => x.id === index),
              1
            );
          })
          .catch(() => {            
          });
      }
    },
    editCategory: function(category) {
      this.updateCategory = category;
    },
    addNewCategory: function() {
      this.updateCategory = this.category;
    },
    saveCategory: function() {
      //if (this.$refs.form.validate()) {

      if (this.updateCategory.id > 0) {
        axios
          .put(
            "http://phpapi.bmgtech.ca/index.php/api/categories?id=" +
              this.updateCategory.id,
            this.updateCategory
          )
          .then(() => {            
            this.updateCategory = this.category;            
          })
          .catch(() => {            
          });
      } else {
        axios
          .post(
            "http://phpapi.bmgtech.ca/index.php/api/categories",
            this.updateCategory
          )
          .then(() => {
            this.getCategories();
            this.updateCategory = this.category;
          })
          .catch(() => {            
          });        
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>