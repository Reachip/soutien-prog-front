export const state = () => ({
    selectedCourse: null
})
  
export const mutations = {
    changeCourseSelection (state, courseID) {
        state.selectedCourse = courseID
    },
}