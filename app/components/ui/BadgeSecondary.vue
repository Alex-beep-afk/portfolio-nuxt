<script setup>

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    hoverColor: {
        type: String,
        required: false,
        default: "pills-glow-blue"
    },
    isActive: {
        type: Boolean,
        required: false,
        default: false
    }
})


</script>

<template>
    <span class="text-blue-500 font-bold md:text-xl text-sm cursor-pointer text-center border border-slate-400/50 rounded-full px-5 py-2 bg-black 
        hover:scale-110 hover:text-white transition-all duration-500 ease-in-out" :class="hoverColor + ' ' + (isActive ? 'ring-2 ring-blue-500' : '')">{{
        label }} 
    </span>
</template>