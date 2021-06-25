export const state = () => ({
  purposeModalisInvisible: true,
  participationModalisInvisible: true
})

export const mutations = {
  togglePurposeModal (state) {
    state.purposeModalisInvisible = !state.purposeModalisInvisible
  },

  toggleParticipationModal (state) {
    state.participationModalisInvisible = !state.participationModalisInvisible
  }
}