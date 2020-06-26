<template>
  <div id="home-page">
    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-container>
        <v-row align="center">
          <v-col>
            <h1 class="display-1 font-weight-light">
              <span v-if="$store.state.logged">
                欢迎回来 {{ $store.state.username }}
              </span>
              <span v-else>
                Labman - More intelligent online team management system
              </span>
            </h1>
            <blockquote class="blockquote">
              <v-icon dark>mdi-format-quote-open</v-icon>
              {{ quoteText }}
              <small class="ml-4">{{ quoteAuthor }}</small>
              <v-icon dark>mdi-format-quote-close</v-icon>
            </blockquote>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
    <v-container>
      <v-row>
        <v-col cols="12" sm="5">
          <NoticesCard />
        </v-col>
        <v-col cols="12" sm="7">
          <v-card>
            <v-card-title>Hey!</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

import NoticesCard from "../components/NoticesCard";
export default {
  name: "Home",
  components: { NoticesCard },
  data: () => ({
    quoteText: "",
    quoteAuthor: ""
  }),
  created: function() {
    this.getQuote();
  },
  methods: {
    getQuote: function() {
      this.axios
        .get("quote/")
        .then(response => {
          this.quoteText = response.data.text;
          this.quoteAuthor = response.data.author;
        })
        .catch(error => {
          this.$emit("make-dialog", "获取语料出错", error);
        });
    }
  }
};
</script>
