<template>
  <div id="app">
    <v-form ref="form" v-model="valid">
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
                <v-dialog v-model="dialogEdit[item.id]" width="500" :key="item.id" :id="item.id">
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
                    <v-icon color="red" dark v-on="on" @click="deleteItem(item)">mdi-delete</v-icon>
                  </template>
                  <span>Delete Item</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-form>
    <v-divider></v-divider>
    <v-snackbar v-model="snackbar" :multi-line="multiLine">
      {{ this.message }}
      <v-btn color="red" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "BaseManageItems",

  data() {
    return {
      item: {
        id: 0,
        name: null,
        description: null
      },
      updateItem: {
        id: 0,
        name: null,
        description: null
      },
      valid: true,
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
    this.getItemsAction();
  },

  methods: {
    ...mapActions([
      "getItemsAction",
      "addItemAction",
      "deleteItemAction",
      "updateItemAction"
    ]),
    snackMessage: function(message) {
      this.message = message;
      this.snackbar = true;
    },
    deleteItem: function(item) {
      if (confirm(`Do you really want to delete Item ${item.name}?`)) {
        this.deleteItemAction(item);
        this.snackMessage(`Category "${item.name}" deleted successfully!`);
      }
    },
    editItem: function(item) {
      this.updateItem = item;
    },
    initializeItem: function(){
      this.$refs.form.validate();
      this.updateItem = {
        id: 0,
        name: "",
        description: ""
      }
    },
    addNewItem: function() {
      this.updateItem = this.item;
    },
    saveItem: function() {
      if (this.$refs.form.validate()) {
        if (this.updateItem.id > 0) {
          this.updateItemAction(this.updateItem);
          this.snackMessage(
            `Item "${this.updateItem.name}" updated successfully!`
          );
        } else {
          this.addItemAction(this.updateItem);
          this.snackMessage(
            `Item "${this.updateItem.name}" added successfully!`
          );
        }
      } else {
        this.dialog = false;
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  computed: {
    ...mapState(["items"])
  }
};
</script>