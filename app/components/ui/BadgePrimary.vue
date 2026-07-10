<script setup>
defineProps({
    to:{
        type:String,
        required:true
    },
    linkText:{
        type:String,
        required:true
    }
})
</script>

<template>
    <NuxtLink :to="to"
        class="px-4 py-2 text-sm border border-white/10 text-blue-300/70 rounded-full hover:text-white hover:border-blue-500 hover:bg-white/5 transition-all">
        {{ linkText }}
    </NuxtLink>
</template>