<script setup>
const props = defineProps({
    label: String,
    to: String
})
</script>


<template>
    <NuxtLink :to="to" class="bg-black px-8 py-3 font-bold text-white rounded-full border border-slate-400/30 hover:bg-white/10
          transition-colors duration-500 ease-in-out ">{{ label }}
    </NuxtLink>
</template>