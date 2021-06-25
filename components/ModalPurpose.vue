<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    :class="{invisible: this.$store.state.modal.purposeModalisInvisible}"
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
                  <label class="text-base">Pour quand ?</label><br />
                  <input
                    type="date"
                    placeholder=""
                    name=""
                    class="bg-gray-200 p-2 rounded my-2"
                  />
                </div>

                <div class="m-4">
                  <label class="text-base">A quelle heure ?</label><br />
                  <input
                    type="time"
                    placeholder=""
                    name=""
                    class="bg-gray-200 p-2 rounded my-2"
                  />
                </div>

                <div class="m-4">
                  <label class="text-base">Pour quel module ?</label><br />
                  <input
                    type="text"
                    placeholder=""
                    class="bg-gray-200 p-2 rounded my-2"
                    name=""
                  />
                </div>

                <div class="m-4">
                  <label class="text-base">Description</label><br />
                  <textarea
                    type="text"
                    class="rounded my-2 bg-gray-200 p-2"
                    rows="3"
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
</template>
<script>
export default {
  methods: {
    togglePurposeModal() {
      this.$store.commit('modal/togglePurposeModal')
    },

    async postNewCourse() {
      await this.$axios.post("/course")
    }
  },

  data: function() {
    return {
      when: null,
      starting_at: null,
      module: null,
      description: null
    }
  }
}
</script>