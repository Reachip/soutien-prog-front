<template>
  <transition name="fade">
    <div
      class="fixed top-24 inset-0 overflow-y-auto"
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
          sm:block sm:p-0
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
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
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
                      v-model="courseName"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                    <span
                      v-if="!$v.courseName.required"
                      class="
                        flex
                        items-center
                        font-medium
                        tracking-wide
                        text-red-500 text-xs
                        mt-1
                        ml-1
                      "
                    >
                      Veuillez indiquer un nom pour ce soutien
                    </span>
                  </div>

                  <div class="m-4">
                    <label class="text-base"
                      >Quelle sera la date de début ?</label
                    ><br />
                    <input
                      type="date"
                      placeholder=""
                      v-model="startingAtDate"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                    <input
                      type="time"
                      placeholder=""
                      v-model="startingAtTime"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                    <span
                      v-if="
                        !$v.startingAtTime.required ||
                        !$v.startingAtDate.required
                      "
                      class="
                        flex
                        items-center
                        font-medium
                        tracking-wide
                        text-red-500 text-xs
                        mt-1
                        ml-1
                      "
                    >
                      Veuillez indiquer une heure et une date de début
                    </span>
                  </div>

                  <div class="m-4">
                    <label class="text-base">Quelle sera la date de fin ?</label
                    ><br />
                    <input
                      type="date"
                      placeholder=""
                      v-model="endingAtDate"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                    <input
                      type="time"
                      placeholder=""
                      v-model="endingAtTime"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                    <span
                      v-if="
                        !$v.endingAtTime.required ||
                        !$v.endingAtDate.required
                      "
                      class="
                        flex
                        items-center
                        font-medium
                        tracking-wide
                        text-red-500 text-xs
                        mt-1
                        ml-1
                      "
                    >
                      Veuillez indiquer une heure et une date de fin
                    </span>
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
                      <option
                        v-for="module in this.$store.state.courseData.modules"
                      >
                        {{ module.module_name }}
                      </option>
                    </select>
                    <span
                      v-if="!$v.moduleName.required"
                      class="
                        flex
                        items-center
                        font-medium
                        tracking-wide
                        text-red-500 text-xs
                        mt-1
                        ml-1
                      "
                    >
                      Veuillez indiquer un module pour ce soutien
                    </span>
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
                    <span
                      v-if="
                        !$v.description.required || !$v.description.minLength
                      "
                      class="
                        flex
                        items-center
                        font-medium
                        tracking-wide
                        text-red-500 text-xs
                        mt-1
                        ml-1
                      "
                    >
                      Veuillez indiquer une description pour ce soutien avec un
                      minimum de 10 caractères
                    </span>
                  </div>

                  <div class="m-4">
                    <label class="text-base">Lien vers la visio</label><br />
                    <input
                      type="text"
                      placeholder=""
                      v-model="linkTo"
                      class="bg-gray-200 p-2 rounded my-2"
                    />
                    <span
                      v-if="!$v.linkTo.mustBeVisioConferenceLink"
                      class="
                        flex
                        items-center
                        font-medium
                        tracking-wide
                        text-red-500 text-xs
                        mt-1
                        ml-1
                      "
                    >
                      Veuillez indiquer lien vers la visioconférence depuis les
                      sites : Google Meet, Microsoft Teams, Zoom ou Discord
                    </span>
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
                focus:ring-2
                focus:ring-offset-2
                focus:ring-red-500
                sm:ml-3 sm:w-auto sm:text-sm
              "
              m
              @click="postNewCourse()"
            >
              Proposer un soutien
            </button>
            <button
              type="button"
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
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
                sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
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
import moment from "moment";
import jwtDecode from "jwt-decode";
import { alpha, required, minLength } from "vuelidate/lib/validators";
import mustBeVisioConferenceLink from "@/validator/mustBeVisioConferenceLink";

export default {
  methods: {
    togglePurposeModal() {
      this.$store.commit("modal/togglePurposeModal");
      this.$store.commit("band/closeBand");
    },

    async postNewCourse() {
      this.$v.$touch();

      if (!this.$v.invalid) {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        };

        const data = {
          description: this.description,
          ending_at: moment(
            `${this.endingAtDate} ${this.endingAtTime}`,
            "DD-MM-YYYY HH:mm"
          ).format("YYYY-MM-DDTHH:mm:ss.SSS"),
          starting_at: moment(
            `${this.startingAtDate} ${this.startingAtTime}`,
            "DD-MM-YYYY HH:mm"
          ).format("YYYY-MM-DDTHH:mm:ss.SSS"),
          teacher: jwtDecode(localStorage.getItem("token")).username,
          school_module: this.moduleName,
          courseName: this.courseName,
          link_to: this.linkTo,
        };

        try {
          await this.$axios.post("/course/", data, config);
          this.$store.commit("modal/togglePurposeModal");
          this.$store.commit(
            "band/toggleBandAsSuccess",
            "Votre cours a bien été enregistré"
          );
        } catch (_) {
          this.$store.commit(
            "band/toggleBandAsFail",
            "Impossible de créer votre cours : Une erreur inconnu a été invoquée"
          );
        }
      } else {
        this.$store.commit(
          "band/toggleBandAsFail",
          "Impossible de créer votre cours : Veuillez vérfier les champs saisies"
        );
      }
    },
  },

  data: function () {
    return {
      courseName: null,
      endingAtDate: null,
      endingAtTime: null,
      startingAtDate: null,
      startingAtTime: null,
      moduleName: null,
      description: null,
      linkTo: null,
    };
  },

  validations() {
    return {
      courseName: { required, alpha },
      endingAtDate: { required },
      endingAtTime: { required },
      startingAtDate: { required },
      startingAtTime: { required },
      moduleName: { required },
      description: { required, minLength: minLength(10) },
      linkTo: { mustBeVisioConferenceLink },
    };
  },
};
</script>
