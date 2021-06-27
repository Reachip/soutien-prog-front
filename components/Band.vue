<template>
    <div class="text-white p-3" 
        v-bind:class="[this.bg]" 
        v-show="!this.$store.state.band.bandIsInvisible">
        <div class="flex justify-between">
            <p class="font-semibold text-center mx-8">{{this.$store.state.band.text}}</p>
            <i class="material-icons cursor-pointer" @click="deleteBand()">delete</i>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            bg: null
        }
    },

    mounted() {
        if (this.$store.state.band.isFailling)
            this.bg = "bg-red-600"

        else
            this.bg = "bg-green-600"
    },


    methods: {
        deleteBand() {
            this.$store.commit('band/toggleBand')
        } 
    }
}
</script>