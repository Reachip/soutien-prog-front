export const state = () => ({
    bandIsInvisible: true,
    bgProp: "",
    text: ""
})
  
export const mutations = {
    toggleBandAsFail (state, text) {
        if (state.bandIsInvisible)
            state.bandIsInvisible = false   

        state.text = text
        state.bgProp = "bg-red-600"
    },

    toggleBandAsSuccess(state, text) {
        if (state.bandIsInvisible)
            state.bandIsInvisible = false   

        state.text = text
        state.bgProp = "bg-green-600"
    },

    closeBand(state) {
        state.bandIsInvisible = true   
    }
}