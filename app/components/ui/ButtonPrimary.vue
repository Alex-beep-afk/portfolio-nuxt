<script setup>
    const props = defineProps({
        label: String,
        to: String
    })
</script>

<template>
    <NuxtLink :to="to"
        class="relative overflow-hidden group px-8 py-3 font-bold text-blue-600 border-2 border-blue-600 rounded-full transition-colors duration-300 hover:text-white">
        <span
          class="absolute inset-0 bg-blue-600 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
    
        <span class="relative z-10">{{ label }}</span>
    </NuxtLink>
</template>