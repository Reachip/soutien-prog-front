export const state = () => ({
  purposeModalisInvisible: true,
  participationModalisInvisible: true,
  connectionModalIsInvisible: true,
});

export const mutations = {
  togglePurposeModal(state) {
    state.purposeModalisInvisible = !state.purposeModalisInvisible;
  },

  toggleParticipationModal(state) {
    state.participationModalisInvisible = !state.participationModalisInvisible;
  },

  toggleConnectionModal(state) {
    state.connectionModalIsInvisible = !state.connectionModalIsInvisible;
  },
};
