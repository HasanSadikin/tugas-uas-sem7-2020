<template>
  <body class="is-preload pa-0">
    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <section id="intro">
          <header>
            <h2 class="text-center">Prestasi</h2>
          </header>
        </section>
        <!-- Post -->
        <v-row class="row ma-0" dense>
          <v-col
            :key="index"
            v-for="(post, index) in prestasi"
            cols="12"
            md="4"
          >
            <v-card class="mx-auto">
              <router-link :to="`/prestasi/` + post.slug.current">
                <v-img :src="post.mainImage.asset.url" height="200px"></v-img>
              </router-link>

              <v-card-title>
                <router-link :to="`/prestasi/` + post.slug.current">
                  {{ post.title }}
                </router-link>
              </v-card-title>

              <v-card-subtitle>
                {{ post.publishedAt }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="orange lighten-2"
                  text
                  :to="`/prestasi/` + post.slug.current"
                >
                  Selengkapnya
                </v-btn>
              </v-card-actions>
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
    berita: [],
    prestasi: [],
  }),
  mounted() {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(publishedAt asc){
      title,
      slug,
      publishedAt,
      category,
      body,
      author->{
        name,
        image{
          asset->{
            _id,
            url
          }
        }
      }
      ,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      }
    }`
      )
      .then((data) => {
        this.posts = data;
        for (let index = 0; index < this.posts.length; index++) {
          //ganti tanggal
          const newPublishDate = this.changePublishDate(
            this.posts[index].publishedAt
          );
          this.posts[index].publishedAt = newPublishDate;

          //pendekkan bodynya
          let paragraph = this.posts[index].body[0].children[0].text;

          const batas = 300;

          if (paragraph.length >= batas) {
            const slicedParagraph = `${paragraph.slice(0, batas)}...`;
            this.posts[index].body[0].children[0].text = slicedParagraph;
          }
        }

        this.posts.forEach((post) => {
          if (post.category == "berita") {
            this.berita.push(post);
          } else {
            this.prestasi.push(post);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    changePublishDate(tanggal) {
      const split = tanggal.split("T");
      const split2 = split[0].split("-");

      let bulan = "";

      switch (split2[1]) {
        case "01":
          bulan = "Januari";
          break;
        case "02":
          bulan = "Februari";
          break;
        case "03":
          bulan = "Maret";
          break;
        case "04":
          bulan = "April";
          break;
        case "05":
          bulan = "Mei";
          break;
        case "06":
          bulan = "Juni";
          break;
        case "07":
          bulan = "Juli";
          break;
        case "08":
          bulan = "Agustus";
          break;
        case "09":
          bulan = "September";
          break;
        case "10":
          bulan = "Oktober";
          break;
        case "11":
          bulan = "November";
          break;
        default:
          bulan = "Desember";
          break;
      }

      const newPublishDate = `${split2[2]} ${bulan} ${split2[0]}`;
      return newPublishDate;
    },

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
