<template>
  <div class="">
    <section id="intro">
      <header>
        <h2>Siswa SMK Negeri 4 Manado</h2>
      </header>
    </section>
    <v-row class="row ma-0" dense>
      <v-col v-for="(siswa, index) in siswa" :key="index" cols="6" md="3">
        <v-card>
          <v-img
            :src="siswa.image.asset.url"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150px"
          >
          </v-img>
          <v-card-actions>
            {{ siswa.name }}
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import sanityClient from "../assets/js/client.js";

export default {
  name: "Siswa",
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
    siswa: [],
  }),
  created() {
    sanityClient
      .fetch(
        `*[_type == "murid"] | order(name asc){
      name,
      ttl,
      nisn,
      jenisKelamin,
      isAlumni,
      alamat,
      image{
        asset->{
          _id,
          url
        },
      }
    }`
      )
      .then((data) => {
        this.siswa = data;
        this.changeJK(this.siswa);
        this.siswa = this.FilterAlumni(this.siswa);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    changeJK(data) {
      data.forEach((siswa) => {
        if (siswa.jenisKelamin == "P") {
          siswa.jenisKelamin = "Perempuan";
        } else {
          siswa.jenisKelamin = "Laki-laki";
        }
      });
    },
    FilterAlumni(data) {
      return data.filter((siswa) => siswa.isAlumni == "false");
    },
  },
};
</script>

<style scoped>
.row {
  max-width: 850px;
}
</style>
