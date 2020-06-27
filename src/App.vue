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
    <v-snackbar v-model="toastVisible" timeout="2000" top :color="toastType">
      <v-icon v-if="toastType === 'success'" left>
        mdi-check-circle-outline
      </v-icon>
      <v-icon v-if="toastType === 'info'" left>
        mdi-alert-circle-outline
      </v-icon>
      <v-icon v-if="toastType === 'error'" left>
        mdi-close-circle-outline
      </v-icon>
      {{ toastText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: { NavBar },
  data: () => ({
    dialog: false,
    dialogColor: "primary",
    dialogTitle: "",
    dialogContent: ""
  }),
  computed: {
    toastVisible: {
      get() {
        return this.$store.state.toastVisible;
      },
      set(value) {
        this.$store.commit("setToastVisible", value);
      }
    },
    toastText() {
      return this.$store.state.toastText;
    },
    toastType() {
      return this.$store.state.toastType;
    }
  },
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
          this.$store.commit({
            type: "makeToast",
            text: error,
            color: "error"
          });
          this.$store.commit("logout");
        });
    },
    makeDialog: function(title, content) {
      this.dialogTitle = title;
      this.dialogContent = content;
      this.dialog = true;
    }
  }
};
</script>
