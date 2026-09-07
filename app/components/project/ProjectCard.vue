<script setup>
const props = defineProps({
  project: Object,
  required: true,
})

const emit = defineEmits(['showProject'])
</script>


<template>
  <div @click="emit('showProject')" class="group w-full cursor-pointer h-full 
  flex flex-col justify-between gap-5 border border-slate-400/50 
  rounded-3xl overflow-hidden relative hover:border-blue-500
  hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] 
  transition-all duration-500 ease-in-out ">

    <div :style="{backgroundImage: project.coverImage.contentUrl ? `url(${$config.public.apiBaseUrl}${project.coverImage.contentUrl})` : 'url(/medias/images/bg-default.png)'}" class="absolute inset-0 
      bg-cover bg-center bg-no-repeat bg-black
      transition-all duration-700 ease-in-out filter lg:grayscale lg:group-hover:grayscale-0 group-hover:scale-110 z-0
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
      <h3 class="bg-black/70 p-5 rounded-xl text-blue-500 text-xl font-bold text-center border border-blue-500 backdrop-blur-xl w-full lg:text-2xl">{{ project.title }}</h3>
      <p class="text-blue-300 font-semibold text-lg text-center md:text-left">{{ project.description.length >= 90 ? project.description.slice(0, 100) + '...' : project.description }}</p>

      <div class="flex flex-wrap gap-5">
        <UiBadgeSecondary v-for="tech in project.techno" :key="tech.id" :label="tech.title" />
      </div>
    </div>

  </div>
</template>
