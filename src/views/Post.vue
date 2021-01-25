<template>
  <!-- Post -->
  <article class="post">
    <header>
      <div class="title">
        <h3 class="headline">
          {{ post.title }}
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
    <span class="image featured"
      ><img :src="post.mainImage.asset.url" alt=""
    /></span>
    <block-content
      :blocks="post.body"
      projectId="faoq2vbv"
      dataset="production"
      ,
    />
    <!-- <footer>
              <ul class="stats">
                <li><a href="#">General</a></li>
                <li><a href="#" class="icon solid fa-heart">28</a></li>
                <li><a href="#" class="icon solid fa-comment">128</a></li>
              </ul>
            </footer> -->
  </article>
</template>

<script>
import sanityClient from "../assets/js/client.js";
import BlockContent from "sanity-blocks-vue-component";

export default {
  name: "Post",
  components: {
    BlockContent,
  },
  data: () => ({
    post: {},
  }),
  mounted() {
    sanityClient
      .fetch(
        `*[_type == "post" && slug.current == '${this.$route.params.slug}']{
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
        this.post = data[0];
        console.log(this.post);
        this.post.publishedAt = this.changePublishDate(this.post.publishedAt);
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
  },
};
</script>

<style></style>
