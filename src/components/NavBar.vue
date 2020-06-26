<template>
  <v-app-bar app color="primary" dark fixed>
    <div class="d-flex align-center">
      <h1>{{ brandText }}</h1>
    </div>
    <v-tabs class="ml-4">
      <v-tab to="/">{{ homePageText }}</v-tab>
      <v-tab to="/about">{{ aboutPageText }}</v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <v-btn v-if="$store.state.is_staff" text to="/console">
      <v-icon class="mr-2">{{ consoleIcon }}</v-icon> {{ consolePageText }}
    </v-btn>
    <v-menu
      offset-y
      open-on-hover
      transition="scroll-y-transition"
      min-width="150px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" text v-on="on">
          <span v-if="$store.state.logged">
            <v-icon>{{ loggedIcon }}</v-icon> {{ $store.state.username }}
          </span>
          <span v-else @click="$router.push('/login')">
            <v-icon>{{ loginIcon }}</v-icon> {{ loginText }}
          </span>
        </v-btn>
      </template>
      <v-list v-if="$store.state.logged">
        <v-list-item @click="$router.push('/logout')">
          <v-list-item-title>
            <v-icon>{{ logoutIcon }}</v-icon> {{ logoutText }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item @click="$router.push('/login')">
          <v-list-item-title>
            <v-icon>{{ loginIcon }}</v-icon> {{ loginText }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/register')">
          <v-list-item-title>
            <v-icon>{{ registerIcon }}</v-icon> {{ registerText }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    brandText: "Labman",
    homePageText: "Home",
    aboutPageText: "About",
    consolePageText: "控制台",
    loginText: "登录",
    registerText: "注册",
    logoutText: "注销",
    consoleIcon: "mdi-console",
    loggedIcon: "mdi-account-check",
    loginIcon: "mdi-account-arrow-left",
    logoutIcon: "mdi-logout",
    registerIcon: "mdi-account-plus"
  })
};
</script>

<style scoped></style>
