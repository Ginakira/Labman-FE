<template>
  <div id="console-page">
    <v-navigation-drawer
      color="primary"
      width="200px"
      mini-variant
      permanent
      expand-on-hover
      app
      dark
    >
      <v-list dense nav>
        <v-list-item two-line class="px-0">
          <v-list-item-avatar>
            <v-avatar color="teal">
              {{ $store.state.username.substr(0, 2) }}
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              {{ $store.state.username }}
            </v-list-item-title>
            <v-list-item-subtitle
              v-if="$store.state.is_superuser"
              class="overline"
            >
              {{ superUserText }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              v-else-if="$store.state.is_staff"
              class="overline"
            >
              {{ staffText }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="py-2"></v-divider>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          link
          :to="item.router"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <router-view />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Console",
  data: () => ({
    superUserText: "超级管理员",
    staffText: "管理员",
    navItems: [
      {
        title: "总览",
        icon: "mdi-view-dashboard",
        router: "/console/dashboard"
      },
      {
        title: "公告管理",
        icon: "mdi-bulletin-board",
        router: "/console/notices"
      }
    ]
  }),
  created: function() {}
};
</script>

<style scoped></style>
