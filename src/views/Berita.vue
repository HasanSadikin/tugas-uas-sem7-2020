<template>
  <div class="">
    <div class="single is-preload">
      <!-- Wrapper -->
      <div id="wrapper">
        <!-- Main -->
        <div id="main">
          <router-view :key="$route.fullPath"></router-view>
        </div>

        <!-- <Post :post="post" /> -->
        <section id="sidebar">
          <!-- Intro -->
          <section id="intro">
            <header>
              <h2>Berita</h2>
            </header>
          </section>

          <!-- Mini Posts -->
          <section>
            <div class="mini-posts">
              <template v-for="(post, index) in berita">
                <!-- Mini Post -->
                <article class="mini-post" :key="index">
                  <header>
                    <h3>
                      <router-link
                        :to="`/berita/` + post.slug.current"
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
                    :to="`/berita/` + post.slug.current"
                    @click.native="scrollToTop"
                    class="image"
                    ><v-img
                      :src="post.mainImage.asset.url"
                      max-height="150"
                      alt=""
                  /></router-link>
                </article>
              </template>
            </div>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import sanityClient from "../assets/js/client.js";
// import Post from "../components/Post.vue";

export default {
  name: "Berita",
  components: {
    // Post,
  },
  data: () => ({
    posts: [],
    berita: [],
    post: {},
  }),
  mounted() {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(_createdAt asc){
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
        }

        this.posts.forEach((post) => {
          if (post.category == "berita") {
            this.berita.push(post);
          }
        });

        this.posts.forEach((post) => {
          if (post.slug.current == `${this.$route.params.slug}`) {
            this.post = post;
          }
        });

        // console.log(this.post);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
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
  },
};
</script>

<style scoped>
@import url("../assets/css/main.css");
</style>
