<template>
  <nav class="bg-gray-100 shadow sticky top-0 z-50">
    <Band />
    <div class="px-2 sm:px-6 lg:px-8 bg-red-700">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-400
              hover:text-white
              hover:bg-gray-700
              focus:outline-none
              focus:ring-2 focus:ring-inset focus:ring-white
            "
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="
            flex-1 flex
            items-center
            justify-center
            sm:items-stretch
            sm:justify-start
          "
        >
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a
                class="px-3 py-2 rounded-md text-sm font-medium text-white"
                >Accueil</a
              >
              <a
                class="
                  bg-gray-150
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                  text-white
                "
                aria-current="page"
                v-show="this.$store.state.user.isConnected"
                @click="changeModalPurposeVisibility()"
                >Proposer un soutien</a
              >
              <a
                class="
                  bg-gray-150
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                  text-white
                "
                @click="changeConnectionModalVisibility()"
                v-show="!this.$store.state.user.isConnected"
                >Connexion</a>

                <a
                class="
                  bg-gray-150
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                  text-white
                "
                @click="logout()"
                v-show="this.$store.state.user.isConnected"
                >Deconnexion</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          class="
            text-black
            block
            px-3
            py-2
            rounded-md
            text-base
            font-medium
          "
          aria-current="page"
          >Accueil</a
        >
        <a
          id="proposer-soutien"
          v-show="this.$store.state.user.isConnected"
          class="text-black px-3 py-2 rounded-md text-base font-medium"
          >Proposer un soutien</a
        >
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    changeModalPurposeVisibility() {
      this.$store.commit("modal/togglePurposeModal")
    },

    changeConnectionModalVisibility() {
      this.$store.commit("modal/toggleConnectionModal")
    },

    logout() {
      localStorage.removeItem("token")
      this.$store.commit('user/changeUserConnectionState')
      this.$store.commit("band/toggleBandAsSuccess", "Vous vous êtes déconnecté")
    },
  },
};
</script>
