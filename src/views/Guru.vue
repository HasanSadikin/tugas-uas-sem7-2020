<template>
  <div class="">
    <section id="intro">
      <header>
        <h2>Guru SMK Negeri 4 Manado</h2>
      </header>
    </section>
    <v-row class="row ma-0" dense>
      <v-col v-for="(guru, index) in guru" :key="index" cols="6" md="3">
        <v-card>
          <v-img
            :src="guru.image.asset.url"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150px"
          >
          </v-img>
          <v-card-actions>
            {{ guru.name }}
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import sanityClient from "../assets/js/client.js";

export default {
  name: "Guru",
  data: () => ({
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
    ],
    guru: [],
  }),
  created() {
    sanityClient
      .fetch(
        `*[_type == "guru"] | order(name asc){
      name,
      ttl,
      nip,
      jenisKelamin,
      pendidikan,
      alamat,
      telepon,
      image{
        asset->{
          _id,
          url
        },
      }
    }`
      )
      .then((data) => {
        this.guru = data;
        this.changeJK(this.guru);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    changeJK(data) {
      data.forEach((guru) => {
        if (guru.jenisKelamin == "P") {
          guru.jenisKelamin = "Perempuan";
        } else {
          guru.jenisKelamin = "Laki-laki";
        }
      });
    },
  },
};
</script>

<style scoped>
.row {
  max-width: 850px;
}
</style>
