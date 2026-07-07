<template>
    <NuxtLink :to = "to" class=" text-white 
    relative cursor-pointer 
    transition-all duration-500 ease-in-out group">

        <slot />

       <div class="w-0 h-[2px] 
       absolute -bottom-2 
       left-1/2 -translate-x-1/2 
       group-hover:w-full 
       transition-all duration-500 ease-in-out 
       bg-blue-500"></div>
            
    </NuxtLink>
</template>


<script setup>
// On définit la propriété "to" pour savoir vers quelle page le lien pointe
defineProps({
  to: {
    type: [String, Object],
    required: true
  }
})
</script>