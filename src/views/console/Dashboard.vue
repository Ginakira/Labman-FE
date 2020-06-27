<template>
  <div id="console-dashboard-page">
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-text>
            <v-icon color="success" large class="mr-2">
              mdi-checkbox-marked-circle
            </v-icon>
            状态正常
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <span class="overline text--disabled">公告状态</span>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-text>
            <v-icon color="success" large class="mr-2">
              mdi-bulletin-board
            </v-icon>
            共有 {{ noticeCounter }} 条正在显示的公告
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    noticeCounter: 0
  }),
  created: function() {
    this.$axios
      .get("notices/")
      .then(response => {
        this.noticeCounter = response.data.length;
      })
      .catch(error => {
        this.$store.commit({
          type: "makeToast",
          text: error,
          color: "error"
        });
      });
  },
  methods: {}
};
</script>

<style scoped></style>
