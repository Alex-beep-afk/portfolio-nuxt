<script setup>
// defineProps est la fonction qui permet de dire : 
// "Ce composant s'attend à recevoir ces données de l'extérieur"
defineProps({
  title: String,
  description: String,
  techno: Array,
  link: String,
  image: String
})

const emit = defineEmits(['showProject'])
</script>


<template>
  <div @click="emit('showProject')" class="group w-full cursor-pointer h-full 
  flex flex-col justify-between gap-5 border border-slate-400/50 
  rounded-3xl overflow-hidden relative hover:border-blue-500
  hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] 
  transition-all duration-500 ease-in-out ">

    <div :style="{backgroundImage: image ? `url(${$config.public.apiBaseUrl}${image})` : 'url(/medias/images/bg-default.png)'}" class="absolute inset-0 
      bg-cover bg-center bg-no-repeat bg-black
      transition-all duration-700 ease-in-out filter grayscale group-hover:grayscale-0 group-hover:scale-110 z-0
      "></div>

    <div class="absolute -inset-[2px]  backdrop-blur-lg 
      [-webkit-mask-image:linear-gradient(to_bottom,transparent_40%,black_50%)] 
      [mask-image:linear-gradient(to_bottom,transparent_40%,black_50%)] 
      lg:[-webkit-mask-image:linear-gradient(to_bottom,transparent_40%,black_75%)] 
      lg:[mask-image:linear-gradient(to_bottom,transparent_40%,black_75%)]
      z-10">
    </div>

    <div class="w-full h-48 md:h-96 relative z-20"></div>

    <div class="flex flex-col justify-between items-center gap-5 p-8 relative z-20">
      <h3 class="text-blue-500 text-3xl font-bold text-center md:text-left">{{ title  }}</h3>
      <p class="text-blue-300 font-semibold text-lg text-center md:text-left">{{ description.length >= 90 ? description.slice(0, 90) + '...' : description }}</p>

      <ul class="flex gap-5">
        <li class="text-blue-500 
        font-bold text-xl border border-slate-400/50 
        rounded-full px-5 py-2 bg-black" v-for="tech in techno" :key="tech.id" :title="tech.title">
          {{ tech.title }}
        </li>
      </ul>
    </div>

  </div>
</template>
