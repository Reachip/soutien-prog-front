<template>
  <div>
    <Navbar />
    <ModalParticipation />
    <ModalConnection />
    <ModalPurpose />
    <div class="bg-green-600 bg-yellow-600"></div>
    <div class="flex flex-col h-screen justify-between">
      <main>
        <header class="bg-red-700 h-58 border">
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
                <label class="font-bold text-xl text-white">Quand ?</label
                ><br />
                <input
                  type="date"
                  class="border rounded bg-gray-100 border-gray-200 p-2 my-2"
                  v-model="dateInput"
                  :min="actualDate"
                  :max="maxDate"
                  @change="filterCourse()"
                />
              </div>

              <div class="mx-1">
                <label class="font-bold text-xl text-white"
                  >Pour quel module ?</label
                ><br />
                <select
                  class="
                    min-w-full
                    border
                    rounded
                    bg-gray-100
                    border-gray-200
                    p-2
                    my-2
                  "
                  v-model="moduleInput"
                  @change="filterCourse()"
                >
                  <option v-for="module in modules">
                    {{ module.module_name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </header>
        <div v-for="course in filteredCourses">
          <PropositionCard
            :id="course.id"
            :title="course.course_name"
            :author="course.teacher"
            :startAt="course.starting_at"
            :endAt="course.ending_at"
            :subject="course.description"
          />
        </div>
        <p
          v-if="!filteredCourses || filteredCourses.length === 0"
          class="text-center text-xl text-red-700 mt-12"
        >
          Aucun soutien n'a été trouvé pour aujourd'hui ...
        </p>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  async mounted() {
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

  async beforeMount() {
    this.courses = (await this.$axios.get("/course/")).data;

    for (let index = 0; index < this.courses.length; index++) {
      try {
        const course = this.courses[index];

        course.starting_at = moment(
          course.starting_at,
          "YYYY-MM-DDTHH:mm:ss.SSS"
        ).format("DD-MM-YYYY HH:mm");

        course.ending_at = moment(
          course.ending_at,
          "YYYY-MM-DDTHH:mm:ss.SSS"
        ).format("DD-MM-YYYY HH:mm");
      } catch (why) {}
    }

    this.filteredCourses = this.courses;
    this.modules = (await this.$axios.get("/module/")).data;
    this.$store.commit("courseData/setModules", this.modules);
  },

  methods: {
    filterCourse() {
      this.filteredCourses = this.courses;

      if (this.dateInput && this.moduleInput) {
        this.filteredCourses = this.filteredCourses.filter((course) => {
          const formatedDate = moment(
            course.starting_at,
            "DD-MM-YYYY HH:mm"
          ).format("YYYY-MM-DD");
          return (
            formatedDate === this.dateInput &&
            course.school_module === this.moduleInput
          );
        });
      } else if (this.dateInput) {
        this.filteredCourses = this.filteredCourses.filter(
          (course) =>
            moment(course.starting_at, "DD-MM-YYYY HH:mm").format(
              "YYYY-MM-DD"
            ) === this.dateInput
        );
      } else if (this.moduleInput) {
        this.filteredCourses = this.filteredCourses.filter(
          (course) => course.school_module === this.moduleInput
        );
      }
    },
  },

  data() {
    return {
      filteredCourses: null,
      actualDate: moment().format("YYYY-MM-DD"),
      maxDate: moment().add(1, "months").format("YYYY-MM-DD"),
      dateInput: moment().format("YYYY-MM-DD"),
      modules: null,
      courses: null,
      moduleInput: null,
    };
  },
};
</script>
