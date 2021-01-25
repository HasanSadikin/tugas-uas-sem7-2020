<template>
  <body class="is-preload pa-0">
    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <section id="intro">
          <header>
            <h2 class="text-center">Galeri</h2>
          </header>
        </section>
        <!-- Post -->
        <v-row class="row ma-0" dense>
          <v-col :key="index" v-for="(post, index) in posts" cols="6" md="3">
            <v-card class="mx-auto">
              <v-img :src="post.image.asset.url" height="150px"></v-img>

              <v-card-title>
                {{ post.title }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </body>
</template>

<script>
import sanityClient from "../assets/js/client.js";

export default {
  name: "HelloWorld",
  components: {},
  data: () => ({
    posts: [],
  }),
  mounted() {
    sanityClient
      .fetch(
        `*[_type == "galeri"]{
      title,
      image{
        asset->{
          _id,
          url
        },
        alt
      }
    }`
      )
      .then((data) => {
        console.log(data);
        this.posts = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/main.css");

.col-white {
  color: white;
}

.image-post {
  max-height: 400px;
}

a {
  text-decoration: none;
}
</style>
