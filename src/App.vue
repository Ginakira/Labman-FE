<template>
  <v-app>
    <NavBar />
    <v-main class="grey lighten-5">
      <router-view @make-dialog="makeDialog" />
    </v-main>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">{{ dialogTitle }}</v-card-title>
        <v-card-text>{{ dialogContent }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialog = false">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: { NavBar },
  created: function() {
    if (localStorage.getItem("username")) {
      this.$store.commit("loadInfo");
      this.loadUserInfo();
    }
  },
  methods: {
    loadUserInfo: function() {
      this.axios
        .get("user/")
        .then(response => {
          this.$store.commit("setUser", response.data);
        })
        .catch(error => {
          this.makeDialog("错误", error);
          this.$store.commit("logout");
        });
    },
    makeDialog: function(title, content) {
      this.dialogTitle = title;
      this.dialogContent = content;
      this.dialog = true;
    }
  },
  data: () => ({
    dialog: false,
    dialogColor: "primary",
    dialogTitle: "",
    dialogContent: ""
  })
};
</script>
