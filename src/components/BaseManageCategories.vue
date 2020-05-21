<template>
  <div id="app">
    <v-form ref="form" v-model="valid" lazy-validation></v-form>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
              <v-dialog v-model="dialog" width="500" :key="localCategory.id" :id="localCategory.id">
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" dark v-on="on" @click="initializeCategory()">mdi-plus</v-icon>(Add New Category)
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Category Details</v-card-title>

                  <v-card-text>
                    <v-text-field
                      v-model="localCategory.name"
                      :counter="100"
                      :rules="nameRules"
                      label="Category Name"
                      required
                    ></v-text-field>

                    <v-text-field v-model="localCategory.description" label="Description"></v-text-field>

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
                      @click="initializeCategory()"
                      @click.stop="dialog = false"
                    >Cancel</v-btn>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </th>
            <th class="text-left">Edit</th>
            <th class="text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in categories" :key="cat.id">
            <td>{{ cat.name }}</td>
            <td>
              <v-dialog v-model="dialogEdit[cat.id]" width="500" :key="cat.id" :id="cat.id">
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="primary"
                    :id="cat.id"
                    dark
                    v-on="on"
                    @click="editCategory(cat)"
                  >mdi-pencil</v-icon>
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Category Details</v-card-title>

                  <v-card-text>
                    <v-text-field
                      v-model="localCategory.name"
                      :counter="100"
                      :rules="nameRules"
                      label="Category Name"
                      required
                    ></v-text-field>

                    <v-text-field v-model="localCategory.description" label="Description"></v-text-field>

                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="saveCategory()"
                      @click.stop="$set(dialogEdit, cat.id,  false)"
                    >Save</v-btn>

                    <v-btn
                      color="error"
                      class="mr-4"
                      @click.stop="$set(dialogEdit, cat.id,  false)"
                    >Cancel</v-btn>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon color="red" dark v-on="on" @click="deleteCategory(cat)">mdi-delete</v-icon>
                </template>
                <span>Delete Category</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-divider></v-divider>
    <v-snackbar v-model="snackbar" :multi-line="multiLine">
      {{ this.message }}
      <v-btn color="red" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "BaseManageCategories",

  data() {
    return {
      newCategory: {
        id: 0,
        name: null,
        description: null
      },
      localCategory: {
        id: 0,
        name: null,
        description: null
      },
      valid: false,
      name: "",
      nameRules: [v => !!v || "Name is required"],
      dialog: false,
      dialogEdit: [],
      message: null,
      multiLine: true,
      snackbar: false
    };
  },

  mounted() {
    this.getCategoriesAction();
  },

  methods: {
    ...mapActions([
      "getCategoriesAction",
      "addCategoryAction",
      "deleteCategoryAction",
      "updateCategoryAction"
    ]),
    snackMessage: function(message) {
      this.message = message;
      this.snackbar = true;
    },
    deleteCategory: function(category) {
      if (confirm(`Do you want to delete categtory ${category.name}?`)) {
        this.deleteCategoryAction(category);
        this.snackMessage(`Category "${category.name}" deleted successfully!`);
      }
    },
    editCategory: function(category) {
      this.localCategory = category;
    },
    initializeCategory: function() {
      this.localCategory = this.newCategory;
      this.valid = true;
    },
    saveCategory: function() {
      this.validate();
      if (this.localCategory.id > 0) {
        this.updateCategoryAction(this.localCategory);
        this.snackMessage(
          `Category "${this.localCategory.name}" updated successfully!`
        );
      } else if (this.localCategory.name !== null) {
        this.addCategoryAction(this.localCategory);
        this.snackMessage(
          `Category "${this.localCategory.name}" added successfully!`
        );
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = false;
      }
    }
  },
  computed: {
    ...mapState(["categories"])
  }
};
</script>