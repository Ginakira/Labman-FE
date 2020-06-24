<template>
  <div></div>
</template>

<script>
export default {
  name: "Logout",
  created: function() {
    this.axios
      .delete("logout/")
      .then(() => {
        this.$store.commit("logout");
      })
      .catch(error => {
        this.$emit("make-dialog", "注销失败", error.response.data.detail);
      })
      .finally(() => {
        this.$router.push("/");
      });
  }
};
</script>
