<template>
  <transition name="fade">
    <div
      class="fixed z-60 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-show="!this.$store.state.modal.connectionModalIsInvisible"
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
                  Connexion
                </h3>
                <div class="m-4">
                  <div class="m-4">
                    <label class="text-base">Nom d'utilisateur</label><br />
                    <input
                      type="text"
                      placeholder=""
                      name=""
                      v-model="username"
                      class="bg-gray-200 p-2 rounded my-2 min-w-full"
                    />
                  </div>

                  <div class="m-4">
                    <label class="text-base">Mot de passe</label><br />
                    <input
                      type="password"
                      placeholder=""
                      name=""
                      v-model="password"
                      class="bg-gray-200 p-2 rounded my-2 min-w-full"
                    />
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
              @click="handleConnection()"
            >
              Se connecter
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
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                sm:mt-0
                sm:ml-3
                sm:w-auto
                sm:text-sm
              "
              @click="changeModalConnectionVisibility()"
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
import jwt_decode from "jwt-decode";

export default {
  data: function () {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    changeModalConnectionVisibility() {
      this.$store.commit("modal/toggleConnectionModal");
      this.$store.commit("band/closeBand")
    },

    async handleConnection() {
      try {
        const response = (
          await this.$axios.post("/auth/", {
            username: this.username,
            password: this.password,
          })
        ).data;

        jwt_decode(response.access);

        // If the request is a success and the token is valid
        this.$store.commit("modal/toggleConnectionModal")
        this.$store.commit("user/changeUserConnectionState")
        localStorage.setItem("token", response.access)
        this.username = null; this.password = null
        this.$store.commit("band/toggleBandAsSuccess", "Vous êtes connecté !")
      } catch (_) {
        this.$store.commit("band/toggleBandAsFail", "Impossible de se connecter. Veuillez vérifer vos identifiants")
      }
    },
  },
};
</script>