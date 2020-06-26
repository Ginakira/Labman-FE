<template>
  <div class="notices-card">
    <v-card>
      <v-list flat two-line>
        <v-subheader>
          <v-icon class="mr-2">mdi-bulletin-board</v-icon>公告
        </v-subheader>
        <v-list-item v-if="!notices.length" class="justify-center">
          <span class="text--disabled">暂无公告</span>
        </v-list-item>
        <v-list-item-group v-else>
          <template v-for="(notice, index) in notices">
            <v-list-item :key="notice.title" @click="showDialog(index)">
              <v-list-item-content>
                <v-list-item-title>
                  {{ notice.title }}
                  <v-icon
                    v-if="notice.priority > 1"
                    small
                    :color="alertIconColor[notice.priority]"
                  >
                    mdi-alert-circle
                  </v-icon>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ notice.content }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ dateParser(notice.edit_time) }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
            <v-divider
              v-if="index + 1 < notices.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-dialog v-model="dialog" width="600px">
      <v-card>
        <v-card-title class="mb-2">
          <span class="headline font-weight-bold">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-subtitle> 最后编辑于 {{ dialogTime }} </v-card-subtitle>
        <v-card-text>
          {{ dialogText }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialog = false">
            好的
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "NoticesCard",
  data: () => ({
    dialog: false,
    dialogTitle: "",
    dialogText: "",
    dialogTime: null,
    notices: [],
    alertIconColor: [
      // 公告优先级标识
      "",
      "",
      "yellow darken-3",
      "yellow darken-4",
      "red lighten-1",
      "red"
    ]
  }),
  created: function() {
    this.getNotices();
  },
  methods: {
    showDialog: function(index) {
      let notice = this.notices[index];
      this.dialogTitle = notice.title;
      this.dialogText = notice.content;
      this.dialogTime = this.$dayjs(notice.edit_time).format(
        "YYYY-MM-DD HH:mm dddd"
      );
      this.dialog = true;
    },
    dateParser: function(date) {
      const my_date = this.$dayjs(date);
      const now = this.$dayjs();
      const elapsed = now - my_date;
      if (elapsed < 60 * 1000) {
        return "刚刚";
      }
      if (elapsed < 2 * 24 * 60 * 60 * 1000) {
        return my_date.fromNow();
      }
      return my_date.format("YYYY-MM-DD");
    },
    getNotices: function() {
      this.axios
        .get("notices/")
        .then(response => {
          this.notices = response.data;
        })
        .catch(error => {
          this.$emit("make-dialog", "获取公告出错", error.response.data.detail);
        });
    }
  }
};
</script>

<style scoped></style>
