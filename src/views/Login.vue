<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card :loading="logging">
          <v-card-title class="headline">
            {{ cardTitle }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="10">
                <v-form ref="form" v-model="formValid">
                  <v-text-field
                    v-model="loginForm.username"
                    label="用户名"
                    :rules="usernameRules"
                    prepend-inner-icon="mdi-account"
                    outlined
                    required
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="loginForm.password"
                    label="密码"
                    :rules="passwordRules"
                    type="password"
                    prepend-inner-icon="mdi-key"
                    @keyup.enter="submitForm"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="resetForm" text>
              {{ resetButtonText }}
            </v-btn>
            <v-btn
              @click="submitForm"
              :disabled="!formValid"
              color="success"
              text
            >
              {{ submitButtonText }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    logging: false,
    formValid: false,
    loginForm: { username: null, password: null },
    usernameRules: [v => !!v || "用户名不可为空"],
    passwordRules: [v => !!v || "密码不可为空"],
    cardTitle: "登录 Labman",
    submitButtonText: "登录",
    resetButtonText: "重置"
  }),
  created: function() {
    if (this.$store.state.logged) {
      this.loadUserInfo();
      this.$router.push("/");
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
          this.$emit(
            "make-dialog",
            "获取用户信息失败",
            error.response.data.detail
          );
        });
    },
    resetForm: function() {
      this.$refs.form.reset();
    },
    submitForm: function() {
      this.logging = true;
      this.axios
        .post("login/", this.loginForm)
        .then(() => {
          this.loadUserInfo();
          this.$router.push("/");
        })
        .catch(error => {
          this.$emit("make-dialog", "登录失败", error.response.data.detail);
        })
        .finally(() => {
          this.logging = false;
        });
    }
  }
};
</script>

<style scoped></style>
