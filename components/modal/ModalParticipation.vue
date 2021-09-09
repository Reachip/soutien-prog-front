<template>
  <transition name="fade">
    <div
      class="fixed z-60 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-show="!this.$store.state.modal.participationModalisInvisible"
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
                  Participer au soutien
                </h3>
                <div class="m-4">
                  <div class="m-4">
                    <label class="text-base">Nom et prénom</label><br />
                    <input
                      type="text"
                      v-model="username"
                      class="bg-gray-200 p-2 rounded my-2 min-w-full"
                    />
                    <span
                      v-if="(!$v.username.required || !$v.username.alpha) && username"
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
                      Veuillez renseigner un nom d'utilisateur valide
                    </span>
                  </div>
                  <div class="m-4">
                    <label class="text-base">Adresse mail</label><br />
                    <input
                      type="email"
                      placeholder=""
                      v-model="email"
                      class="bg-gray-200 p-2 rounded my-2 min-w-full"
                    />
                    <span
                      v-if="(!$v.email.required || !$v.email.email) && email"
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
                      Veuillez renseigner une adresse mail valide
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
              @click="participateHandler()"
            >
              Participer au soutien
            </button>
            <button
              type="button"
              id="participer-soutien-return"
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
              @click="changeModalPurposeVisibility()"
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
import { alpha, required, email } from "vuelidate/lib/validators";

export default {
  mounted() {
    console.log(this.email)
  },

  data: function () {
    return {
      username: null,
      email: null,
    };
  },

  methods: {
    changeModalPurposeVisibility() {
      this.$store.commit("modal/toggleParticipationModal");
      this.$store.commit("band/closeBand");
    },

    async participateHandler() {
      this.$v.$touch();

      if (!this.$v.invalid) {
        try {
          await this.$axios.post("/participant/", {
            course: this.$store.state.modalParticipation.selectedCourse,
            mail: this.email,
            name: this.username,
          });

          this.$store.commit(
            "band/toggleBandAsSuccess",
            "Votre demande de participation a bien été enregistré. Vous recevrez le lien vers la visioconférence par mail et serez notifié 10 minutes avant le début du soutien."
          );
          this.$store.commit("modal/toggleParticipationModal");
        } catch (_) {
          this.$store.commit(
            "band/toggleBandAsFail",
            "Impossible de participer au cours : L'adresse mail est invalide"
          );
        }
      }
    },
  },

  validations() {
    return {
      username: { required, alpha },
      email: { required, email },
    };
  },
};
</script>
