<template>
    <div class="text-white p-3" 
        v-bind:class="[this.$store.state.band.bgProp]" 
        v-show="!this.$store.state.band.bandIsInvisible">
        <div class="flex justify-between">
            <p class="font-semibold text-center mx-8">{{this.$store.state.band.text}}</p>
            <i class="material-icons cursor-pointer" @click="deleteBand()">delete</i>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        deleteBand() {
            this.$store.commit('band/closeBand')
        }
    }
}
</script>