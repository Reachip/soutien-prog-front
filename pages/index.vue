<template>
  <div>
    <Navbar />
    <ModalParticipation />
    <ModalConnection />
    <ModalPurpose />
    <main>
      <header class="bg-red-700 h-64 border">
        <div>
          <div
            class="
              flex flex-wrap
              content-center
              items-center
              justify-center
              my-6
            "
          >
            <div class="mx-1">
              <label class="font-bold text-xl text-white">Quand ?</label><br />
              <input
                type="date"
                class="border rounded bg-gray-100 border-gray-200 p-2 my-2"
                value="2020-03-22"
              />
            </div>

            <div class="mx-1">
              <label class="font-bold text-xl text-white"
                >Pour quel module ?</label
              ><br />
              <select class="min-w-full border rounded bg-gray-100 border-gray-200 p-2 my-2">
                <option v-for="module in modules">{{module.module_name}}</option>
              </select>
              
            </div>
          </div>
          <button
            class="
              block
              bg-red-800
              p-2
              mx-auto
              text-lg
              font-semibold
              tracking-wider
              text-white
              rounded
              hover:bg-red-900
            "
            type="submit"
          >
            Chercher un soutien organisé par un étudiant
          </button>
        </div>
      </header>
      <div v-for="course in this.courses">
        <PropositionCard
          title="Cours"
          :author=course.teacher
          :startAt=course.starting_at
          :endAt=course.ending_at
          :subject=course.description
        />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.getItem("token")) {
      this.$store.commit('user/changeUserConnectionState')
    }
  },

  async beforeMount() {
    this.courses = (await this.$axios.get("/course/")).data;
    this.modules = (await this.$axios.get("/module/")).data;
  },

  data() {
    return {
      modules: null,
      courses: null,
    };
  },
};
</script>
