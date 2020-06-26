<template>
  <div id="console-notices-page">
    <v-row>
      <v-col>
        <v-data-table
          :headers="tableHeaders"
          :items="notices"
          class="elevation-4"
          sort-by="id"
          sort-desc
        >
          <!-- 表头插槽 -->
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="createNotice">
                {{ createNoticeText }}
              </v-btn>
            </v-toolbar>
          </template>

          <!-- 优先级插槽 -->
          <template v-slot:item.priority="{ item }">
            <v-chip :color="priorityItems[item.priority].color" small dark>
              {{ item.priority }}-{{ priorityItems[item.priority].text }}
            </v-chip>
          </template>
          <!-- 编辑时间插槽 -->
          <template v-slot:item.edit_time="{ item }">
            {{ dateParser(item.edit_time) }}
          </template>
          <!-- 无数据时插槽 -->
          <template v-slot:no-data>
            {{ noDataText }}
          </template>
          <!-- 操作列插槽 -->
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editNotice(item)">
              mdi-pencil
            </v-icon>
            <v-icon small class="mr-2" @click="deleteNotice(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <!-- 新建/编辑对话框 -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"> {{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="9">
                <v-text-field
                  v-model="editedItem.title"
                  label="公告标题"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-select
                  v-model="editedItem.priority"
                  :items="priorityItems"
                  :hint="`优先级：${editedItem.priority}`"
                  persistent-hint
                  label="优先级"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="editedItem.content"
                  outlined
                  auto-grow
                  label="公告内容"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close">{{ cancelText }}</v-btn>
          <v-btn color="success" text @click="saveNotice">
            {{ submitText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Notices",
  data: () => ({
    dialog: false,
    createNoticeText: "新建公告",
    tableTitle: "公告管理",
    noDataText: "暂无公告",
    cancelText: "取消",
    tableHeaders: [
      { text: "ID", value: "id" },
      { text: "标题", value: "title" },
      { text: "优先级", value: "priority" },
      { text: "编辑时间", value: "edit_time" },
      { text: "发布者", value: "publisher" },
      { text: "操作", value: "actions", sortable: false }
    ],
    priorityItems: [
      { text: "过期", color: "grey", value: 0 },
      { text: "普通", color: "primary", value: 1 },
      { text: "提醒", color: "yellow darken-3", value: 2 },
      { text: "注意", color: "yellow darken-4", value: 3 },
      { text: "较紧急", color: "red lighten-1", value: 4 },
      { text: "紧急", color: "red", value: 5 }
    ],
    notices: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      priority: 1,
      content: ""
    },
    defaultItem: {
      title: "",
      priority: 1,
      content: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "新建公告" : "编辑公告";
    },
    submitText() {
      return this.editedIndex === -1 ? "发布" : "更新";
    }
  },
  watch: {
    dialog: function(val) {
      val || this.close();
    }
  },
  created: function() {
    this.getNotices();
  },
  methods: {
    dateParser: function(date) {
      const my_date = this.$dayjs(date);
      return my_date.format("YYYY-MM-DD HH:mm");
    },
    getNotices: function() {
      this.axios
        .get("notices/", { params: { all: "true" } })
        .then(response => {
          this.notices = response.data;
        })
        .catch(error => {
          this.$emit("make-dialog", "获取公告出错", error.response.data.detail);
        });
    },
    createNotice: function() {
      this.dialog = true;
    },
    editNotice: function(item) {
      this.editedIndex = this.notices.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteNotice: function(item) {
      let deleteConfirm = confirm(
        "你确定要删除这项公告吗？此操作不可恢复（如仅希望不显示可更改优先级为过期）"
      );
      if (!deleteConfirm) return;
      this.axios
        .delete("notice/" + item.id + "/")
        .then(() => {
          this.getNotices();
        })
        .catch(error => {
          this.$emit("make-dialog", "删除失败", error);
        });
    },
    saveNotice: function() {
      if (this.editedIndex > -1) {
        // 修改公告
        let notice = this.notices[this.editedIndex];
        Object.assign(notice, this.editedItem);
        this.axios
          .put("notice/" + notice.id + "/", this.editedItem)
          .then(() => {
            this.getNotices();
          })
          .catch(error => {
            this.$emit("make-dialog", "更新失败", error);
          });
      } else {
        this.axios
          .post("notices/", this.editedItem)
          .then(() => {
            this.getNotices();
          })
          .catch(error => {
            this.$emit("make-dialog", "新建失败", error);
          });
      }
      this.close();
    },
    close: function() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }
  }
};
</script>

<style scoped></style>
