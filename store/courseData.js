export const state = () => ({
    modules: null,
})
  
export const mutations = {
    setModules (state, modules) {
        state.modules = modules
    }
}