<template>
  <div>
    <Navbar />
    <ModalParticipation />
    <ModalConnection />
    <ModalPurpose />
    <Nuxt />
  </div>
</template>
<script>
export default {  
  async beforeMount() {
    try {
      await this.$axios.post("/verify/");
      this.$store.commit("user/changeUserConnectionState");
    } catch {
      // User is not authenticated,
      // We do not change the user connection state.
    }

    this.$store.commit(
      "band/toggleBandAsInfo",
      "Bienvene sur la version experimental de SoutienProg. Vous pouvez organiser des cours en faisant une demande d'inscription à Rached Mejri."
    );
  },
}
</script>