<template>
  <transition name="fade">
    <div
      class="fixed z-60 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-show="!this.$store.state.modal.purposeModalisInvisible"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block
          sm:p-0
        "
      >
        <div
          class="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="
            inline-block
            align-bottom
            bg-white
            rounded-lg
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8
            sm:align-middle
            sm:max-w-lg
            sm:w-full
          "
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Proposer un soutien
                </h3>
                <div class="m-4">
                  <div class="m-4">
                    <label class="text-base">Quel nom pour ce soutien ?</label
                    ><br />
                    <input
                      type="text"
                      placeholder=""
                      v-model="course_name"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                  </div>

                  <div class="m-4">
                    <label class="text-base"
                      >Quelle sera la date de début ?</label
                    ><br />
                    <input
                      type="date"
                      placeholder=""
                      v-model="starting_at_date"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                    <input
                      type="time"
                      placeholder=""
                      v-model="starting_at_time"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                  </div>

                  <div class="m-4">
                    <label class="text-base">Quelle sera la date de fin ?</label
                    ><br />
                    <input
                      type="date"
                      placeholder=""
                      v-model="ending_at_date"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                    <input
                      type="time"
                      placeholder=""
                      v-model="ending_at_time"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                  </div>

                  <div class="m-4">
                    <label class="text-base">Pour quel module ?</label><br />
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
                      v-model="moduleName"
                    >
                      <option v-for="module in this.$store.state.courseData.modules">
                        {{ module.module_name }}
                      </option>
                    </select>
                  </div>

                  <div class="m-4">
                    <label class="text-base">Description</label><br />
                    <textarea
                      type="text"
                      class="rounded my-2 bg-gray-200 p-2"
                      rows="1"
                      v-model="description"
                      cols="35"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="
                w-full
                inline-flex
                justify-center
                rounded-md
                border border-transparent
                shadow-sm
                px-4
                py-2
                bg-red-600
                text-base
                font-medium
                text-white
                hover:bg-red-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                sm:ml-3
                sm:w-auto
                sm:text-sm
              "
              @click="postNewCourse()"
            >
              Proposer un soutien
            </button>
            <button
              type="button"
              id="proposer-soutien-return"
              class="
                mt-3
                w-full
                inline-flex
                justify-center
                rounded-md
                border border-gray-300
                shadow-sm
                px-4
                py-2
                bg-white
                text-base
                font-medium
                text-gray-700
                hover:bg-gray-50
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                sm:mt-0
                sm:ml-3
                sm:w-auto
                sm:text-sm
              "
              @click="togglePurposeModal()"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import moment from 'moment'
import jwtDecode from 'jwt-decode';

export default {
  methods: {
    togglePurposeModal() {
      this.$store.commit("modal/togglePurposeModal");
    },

    async postNewCourse() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };

      const data = {
          description: this.description,
          ending_at:  moment(`${this.ending_at_date} ${this.ending_at_time}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ss.SSS'),
          starting_at: moment(`${this.starting_at_date} ${this.starting_at_time}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ss.SSS'),
          teacher: jwtDecode(localStorage.getItem("token")).username,
          school_module: this.moduleName,
          course_name: this.course_name
      }

      try {
        await this.$axios.post("/course/", data, config);
        this.$store.commit("modal/togglePurposeModal");
      } catch (_) {
        // TODO
      }
    },
  },

  data: function () {
    return {
      course_name: null,
      ending_at_date: null,
      ending_at_time: null,
      starting_at_date: null,
      starting_at_time: null,
      moduleName: null,
      description: null
    };
  },
};
</script>