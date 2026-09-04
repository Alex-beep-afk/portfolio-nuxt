<script setup>

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
})



</script>

<template>

    <NuxtLink :to="path">
        <div class='rounded p-3 border border-blue-500 transition-all duration-300' :class="isActive ? 'text-blue-500 bg-white font-bold shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]': 'text-blue-500 bg-black hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] hover:ring-2 hover:ring-blue-500' ">{{ label
        }}</div>

    </NuxtLink>


</template>