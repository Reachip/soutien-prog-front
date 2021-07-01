export const state = () => ({
  isConnected: false,
});

export const mutations = {
  changeUserConnectionState(state) {
    state.isConnected = !state.isConnected;
  },
};
