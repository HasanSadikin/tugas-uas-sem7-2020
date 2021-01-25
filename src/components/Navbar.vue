<template>
  <b-navbar toggleable="lg" type="light" variant="white" fixed="top">
    <b-navbar-brand
      ><router-link to="/" @click.native="scrollToTop">
        <v-img
          src="../assets/logo.png"
          width="150"
          height="50"
        ></v-img></router-link
    ></b-navbar-brand>

    <b-navbar-toggle class="h-25" target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="go('/')">Home</b-nav-item>
        <b-nav-item @click="go('/page-berita')">Berita</b-nav-item>
        <b-nav-item @click="go('/page-prestasi')">Prestasi</b-nav-item>
        <b-nav-item-dropdown text="Jurusan" Left>
          <b-dropdown-item @click="go('/profil/siswa')"
            >Profil Siswa</b-dropdown-item
          >
          <b-dropdown-item @click="go('/profil/alumni')"
            >Profil Alumni</b-dropdown-item
          >
          <b-dropdown-item @click="go('/profil/guru')"
            >Profil Guru</b-dropdown-item
          >
          <b-dropdown-item @click="go('/profil/visi-misi')"
            >Visi Misi</b-dropdown-item
          >
          <b-dropdown-item @click="go('/profil/sejarah')"
            >Sejarah Sekolah</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Profil" Left>
          <b-dropdown-item @click="go('/profil/siswa')"
            >Profil Siswa</b-dropdown-item
          >
          <b-dropdown-item @click="go('/profil/alumni')"
            >Profil Alumni</b-dropdown-item
          >
          <b-dropdown-item @click="go('/profil/guru')"
            >Profil Guru</b-dropdown-item
          >
          <b-dropdown-item @click="go('/profil/visi-misi')"
            >Visi Misi</b-dropdown-item
          >
          <b-dropdown-item @click="go('/profil/sejarah')"
            >Sejarah Sekolah</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item @click="go('/galeri')">Galeri</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    go(link) {
      this.scrollToTop();
      this.$router.push(link);
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
