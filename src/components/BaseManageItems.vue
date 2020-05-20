<template>
  <div id="app">
    <v-form ref="form" v-model="valid" lazy-validation></v-form>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
              <v-dialog v-model="dialog" width="500" :key="item.id" :id="item.id">
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" dark v-on="on" @click="editItem(item)">mdi-plus</v-icon>(Add New Item)
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Item Details</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="updateItem.name"
                      :counter="100"
                      :rules="nameRules"
                      label="Item Name"
                      required
                    ></v-text-field>

                    <v-text-field v-model="updateItem.shortname" label="Short Name"></v-text-field>

                    <v-text-field v-model="updateItem.description" label="Description"></v-text-field>

                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="saveItem()"
                      @click.stop="dialog = false"
                    >Save</v-btn>

                    <v-btn
                      color="error"
                      class="mr-4"
                      @click="addNewItem"
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
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <v-dialog
                v-model="dialogEdit[item.id]"
                width="500"
                :key="item.id"
                :id="item.id"
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="primary"
                    :id="item.id"
                    dark
                    v-on="on"
                    @click="editItem(item)"
                  >mdi-pencil</v-icon>
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Item Details</v-card-title>

                  <v-card-text>
                    <v-text-field
                      v-model="updateItem.name"
                      :counter="100"
                      :rules="nameRules"
                      label="Item Name"
                      required
                    ></v-text-field>

                    <v-text-field v-model="updateItem.shortName" label="Short Name"></v-text-field>

                    <v-text-field v-model="updateItem.description" label="Description"></v-text-field>

                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="saveItem()"
                      @click.stop="$set(dialogEdit, item.id,  false)"
                    >Save</v-btn>

                    <v-btn
                      color="error"
                      class="mr-4"
                      @click="addNewItem"
                      @click.stop="$set(dialogEdit, item.id,  false)"
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
                  <v-icon color="red" dark v-on="on" @click="deleteItem(item.id)">mdi-delete</v-icon>
                </template>
                <span>Delete Item</span>
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
  name: "BaseManageItems",

  data() {
    return {
      items: null,
      item: {
        id: 0,
        name: null,
        shortName: null,
        description: null
      },
      updateItem: {
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
    this.getItems();
  },

  methods: {
    getItems: function() {
      axios
        .get("http://phpapi.bmgtech.ca/index.php/api/items")
        .then(response => (this.items = response.data));
    },
    deleteItem: function(index) {
      //console.log(index);
      if (confirm("Do you really want to delete?")) {
        axios
          .delete(
            "http://phpapi.bmgtech.ca/index.php/api/items?id=" + index
          )
          .then(() => {
            //console.log(this.items);
            //console.log(this.items.findIndex(x => x.id === index));
            this.items.splice(
              this.items.findIndex(x => x.id === index),
              1
            );
          })
          .catch(() => {
            //console.log(());
          });
      }
    },
    editItem: function(item) {
      this.updateItem = item;
    },
    addNewItem: function() {
      this.updateItem = this.item;
    },
    saveItem: function() {
      //console.log(this.$refs.form.validate());
      console.log(this.updateItem.id);
      //if (this.$refs.form.validate()) {

      if (this.updateItem.id > 0) {
        axios
          .put(
            "http://phpapi.bmgtech.ca/index.php/api/items?id=" +
              this.updateItem.id,
            this.updateItem
          )
          .then(response => {
            console.log(response);
            this.updateItem = this.item;
            //console.log("Record Updated Successfully!");
          })
          .catch(() => {
            //console.log(());
          });
      } else {
        axios
          .post(
            "http://phpapi.bmgtech.ca/index.php/api/items",
            this.updateItem
          )
          .then(() => {
            this.getItems();
            this.updateItem = this.item;
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