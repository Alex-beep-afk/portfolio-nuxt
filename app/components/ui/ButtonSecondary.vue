<script setup>
const props = defineProps({
    label: String,
    to: String
})
</script>


<template>
    <NuxtLink :to="to" class="bg-black px-8 py-3 font-bold text-white rounded-full border border-slate-400/30 
    hover:bg-white/10 hover:scale-105 hover:border-blue-400/80 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
    cursor-pointer transition-all duration-500 ease-in-out ">{{ label }}
    </NuxtLink>
</template>