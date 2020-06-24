<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card :loading="registering">
          <v-card-title class="headline">
            {{ cardTitle }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="10">
                <v-form ref="form" v-model="formValid">
                  <v-text-field
                    v-model="registerForm.username"
                    label="用户名"
                    :rules="usernameRules"
                    prepend-inner-icon="mdi-account"
                    :hint="usernameHint"
                    outlined
                    required
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="registerForm.password"
                    label="密码"
                    :rules="[passwordRules.required, passwordRules.counter]"
                    type="password"
                    prepend-inner-icon="mdi-key"
                    :hint="passwordHint"
                    required
                    outlined
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="repeatPassword"
                    label="重复密码"
                    :rules="[
                      passwordRules.required,
                      passwordRules.counter,
                      repeatPasswordRules
                    ]"
                    type="password"
                    prepend-inner-icon="mdi-key-minus"
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
  name: "Register",
  data: () => ({
    registering: false,
    formValid: false,
    repeatPassword: null,
    registerForm: { username: null, password: null },
    usernameRules: [v => !!v || "用户名不可为空"],
    passwordRules: {
      required: v => !!v || "密码不可为空",
      counter: v => (v && v.length >= 8) || "密码不可少于8位"
    },
    cardTitle: "注册Labman",
    resetButtonText: "重置",
    submitButtonText: "注册",
    usernameHint: "用户名可使用英文字母、数字及下划线",
    passwordHint: "密码最少为8位"
  }),
  computed: {
    repeatPasswordRules: function() {
      return (
        this.registerForm.password === this.repeatPassword ||
        "两次输入的密码不一致"
      );
    }
  },
  methods: {
    resetForm: function() {
      this.$refs.form.reset();
    },
    submitForm: function() {
      this.registering = true;
      this.axios
        .post("register/", this.registerForm)
        .then(() => {
          this.$emit("make-dialog", "注册成功", "即将转到登录页面");
          this.$router.push("/login");
        })
        .catch(error => {
          this.$emit("make-dialog", "注册失败", error.response.data.detail);
        })
        .finally(() => {
          this.registering = false;
        });
    }
  }
};
</script>

<style scoped></style>
