<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <h1>Labman</h1>
    </div>
    <v-tabs class="ml-4">
      <v-tab to="/">Home</v-tab>
      <v-tab to="/about">About</v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <v-menu
      offset-y
      open-on-hover
      transition="scroll-y-transition"
      min-width="150px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text>
          <span v-if="$store.state.logged">
            <v-icon>mdi-account-check</v-icon> {{ $store.state.username }}
          </span>
          <span v-else @click="$router.push('/login')">
            <v-icon>mdi-account-arrow-left</v-icon> 登录
          </span>
        </v-btn>
      </template>
      <v-list v-if="$store.state.logged">
        <v-list-item @click="$router.push('/logout')">
          <v-list-item-title>
            <v-icon>mdi-logout</v-icon> 注销
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item @click="$router.push('/login')">
          <v-list-item-title>
            <v-icon>mdi-account-arrow-left</v-icon> 登录
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/register')">
          <v-list-item-title>
            <v-icon>mdi-account-plus</v-icon> 注册
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped></style>
