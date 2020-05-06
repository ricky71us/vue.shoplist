<template>
  <div id="app">
    <v-form ref="form" v-model="valid" lazy-validation></v-form>
    <v-spacer />        
    <BaseAddCategory />
    <v-spacer />
    <v-expansion-panels focusable>
      <v-expansion-panel v-for="store in categories" :key="store.id">
        <v-expansion-panel-header>{{store.name}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn>Add New Store</v-btn>
          <v-spacer></v-spacer>
          <BaseStoreItems />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
              <v-dialog v-model="dialog" width="500" :key="category.id" :id="category.id">
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" dark v-on="on" @click="editCategory(category)">mdi-plus</v-icon>(Add New Category)
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

                    <v-text-field v-model="updateCategory.shortname" label="Short Name"></v-text-field>

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
            </th>
            <th class="text-left">Edit</th>
            <th class="text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td>
              <v-dialog
                v-model="dialogEdit[category.id]"
                width="500"
                :key="category.id"
                :id="category.id"
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="primary"
                    :id="category.id"
                    dark
                    v-on="on"
                    @click="editCategory(category)"
                  >mdi-pencil</v-icon>
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

                    <v-text-field v-model="updateCategory.shortName" label="Short Name"></v-text-field>

                    <v-text-field v-model="updateCategory.description" label="Description"></v-text-field>

                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="saveCategory()"
                      @click.stop="$set(dialogEdit, category.id,  false)"
                    >Save</v-btn>

                    <v-btn
                      color="error"
                      class="mr-4"
                      @click="addNewCategory"
                      @click.stop="$set(dialogEdit, category.id,  false)"
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
                  <v-icon color="red" dark v-on="on" @click="deleteCategory(category.id)">mdi-delete</v-icon>
                </template>
                <span>Delete Category</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-divider></v-divider>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "category",

  data() {
    return {
      categories: null,
      category: {
        id: 0,
        name: null,
        shortName: null,
        description: null
      },
      updateCategory: {
        id: 0,
        name: null,
        shortName: null,
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
      //console.log(index);
      if (confirm("Do you really want to delete?")) {
        axios
          .delete(
            "http://phpapi.bmgtech.ca/index.php/api/categories?id=" + index
          )
          .then(() => {
            //console.log(this.categories);
            //console.log(this.categories.findIndex(x => x.id === index));
            this.categories.splice(
              this.categories.findIndex(x => x.id === index),
              1
            );
          })
          .catch(() => {
            //console.log(());
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
      //console.log(this.$refs.form.validate());
      console.log(this.updateCategory.id);
      //if (this.$refs.form.validate()) {

      if (this.updateCategory.id > 0) {
        axios
          .put(
            "http://phpapi.bmgtech.ca/index.php/api/categories?id=" +
              this.updateCategory.id,
            this.updateCategory
          )
          .then(response => {
            console.log(response);
            this.updateCategory = this.category;
            //console.log("Record Updated Successfully!");
          })
          .catch(() => {
            //console.log(());
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
            //console.log(error);
          });
        //}
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