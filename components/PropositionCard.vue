<template>
  <article class="rounded p-8 b g-gray-100 shadow m-10">
    <h2 class="font-bold">{{ title }}</h2>
    <br />
    <p class="text-base">
      <i class="material-icons">schedule</i> {{startAt}} - {{endAt}}
    </p>

    <p class="text-base"><i class="material-icons">face</i> {{ author }}</p>

    <p class="text-base">
      <i class="material-icons">work</i> {{subject}}
    </p>
    <br />
    <button
      href=""
      id="participer-soutien"
      @click="toggleParticipationModal()"
      class="
        bg-red-700
        p-2
        mx-auto
        text-lg
        font-semibold
        tracking-wider
        text-white
        rounded
        hover:bg-red-800
      "
    >
      Participer au soutien
    </button>
  </article>
</template>
<script>
export default {
  props: ["id", "title", "subject", "startAt", "endAt", "author"],
  methods: {
      toggleParticipationModal() {
          this.$store.commit('modalParticipation/changeCourseSelection', this.$props.id)
          this.$store.commit('modal/toggleParticipationModal')
          this.$store.commit("band/closeBand")
      }
  }  
}
</script>