<template>
    <NuxtLink 
    :to = "to"
    class="group [&.router-link-exact-active]:text-blue-300 [&.router-link-exact-active_.underline-bar]:w-full [&.router-link-exact-active_.underline-bar]:bg-blue-300
    text-white 
    relative cursor-pointer 
    transition-all duration-500 ease-in-out group font-heading drop-shadow-[0_5px_5px_rgba(59,130,246,0.8)] text-xl">

        <slot />

       <div class="underline-bar
       w-0 h-[2px] 
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