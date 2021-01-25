<template>
  <body class="is-preload pa-0">
    <v-parallax dark src="../assets/jumbotron.jpg" height="400">
      <v-row align="center" justify="center" class="ma-0">
        <v-col class="text-center col-white" cols="12">
          <div class="subheading">
            Selamat Datang di
          </div>
          <div class="display-1 font-weight-thin mb-4">
            SMK Negeri 4 Manado
          </div>
        </v-col>
      </v-row>
    </v-parallax>
    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <section id="intro">
          <header>
            <h2>Berita</h2>
          </header>
        </section>
        <!-- Post -->
        <template v-for="(post, index) in berita">
          <article class="post" :key="index">
            <header>
              <div class="title">
                <h3>
                  <router-link
                    :to="`/berita/` + post.slug.current"
                    @click.native="scrollToTop"
                    >{{ post.title }}</router-link
                  >
                </h3>
              </div>
              <div class="meta">
                <time class="published" datetime="2015-11-01">{{
                  post.publishedAt
                }}</time>
                <div class="author">
                  <span class="name subtitle-2">{{ post.author.name }}</span
                  ><img :src="post.author.image.asset.url" alt="" />
                </div>
              </div>
            </header>
            <router-link
              :to="`/berita/` + post.slug.current"
              class="image featured"
              @click.native="scrollToTop"
            >
              <v-img
                :src="post.mainImage.asset.url"
                max-width="750"
                max-height="300"
              ></v-img>
            </router-link>
            <p>
              {{ post.body[0].children[0].text }}
            </p>
            <footer>
              <ul class="actions">
                <li>
                  <router-link
                    :to="`/berita/` + post.slug.current"
                    class="button large"
                    @click.native="scrollToTop"
                    >Continue Reading
                  </router-link>
                </li>
              </ul>
              <!-- <ul class="stats">
                <li><a href="#">General</a></li>
                <li><a href="#" class="icon solid fa-heart">28</a></li>
                <li><a href="#" class="icon solid fa-comment">128</a></li>
              </ul> -->
            </footer>
          </article>
        </template>

        <!-- Pagination -->
        <!-- <ul class="actions pagination">
          <li>
            <a href="" class="disabled button large previous">Previous Page</a>
          </li>
          <li><a href="#" class="button large next">Next Page</a></li>
        </ul> -->
      </div>

      <!-- Sidebar -->
      <section id="sidebar">
        <!-- Intro -->
        <section id="intro">
          <header>
            <h2>Prestasi</h2>
          </header>
        </section>

        <!-- Mini Posts -->
        <section>
          <div class="mini-posts">
            <template v-for="(post, index) in prestasi">
              <!-- Mini Post -->
              <article class="mini-post" :key="index">
                <header>
                  <h3>
                    <router-link
                      :to="`/prestasi/` + post.slug.current"
                      @click.native="scrollToTop"
                      >{{ post.title }}</router-link
                    >
                  </h3>
                  <time class="published" datetime="2015-10-20">{{
                    post.publishedAt
                  }}</time>
                  <a href="#" class="author"
                    ><img :src="post.author.image.asset.url" alt=""
                  /></a>
                </header>
                <router-link
                  :to="`/prestasi/` + post.slug.current"
                  class="image featured"
                  @click.native="scrollToTop"
                >
                  <v-img
                    :src="post.mainImage.asset.url"
                    max-height="150"
                  ></v-img>
                </router-link>
              </article>
            </template>
          </div>
        </section>
      </section>
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
  created() {
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
</style>
