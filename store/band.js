export const state = () => ({
    bandIsInvisible: true,
    isFailling: true,
    text: ""
})
  
export const mutations = {
    toggleBand (state, text, fail) {
        state.bandIsInvisible = !state.bandIsInvisible
        state.text = text
        state.isFailling = fail
    },
}