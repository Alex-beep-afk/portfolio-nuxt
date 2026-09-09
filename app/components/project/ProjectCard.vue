<script setup>
const props = defineProps({
  project: Object,
  required: true,
})

const emit = defineEmits(['showProject'])
</script>


<template>
  <article
    @click="emit('showProject')"
    class="group relative w-full h-[420px] sm:h-[460px] cursor-pointer rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/60 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.45)] transition-all duration-500 ease-out flex flex-col justify-end"
  >
    
    <div
      :style="{ backgroundImage: project?.coverImage?.contentUrl ? `url(${$config.public.apiBaseUrl}${project.coverImage.contentUrl})` : 'url(/medias/images/bg-default.png)' }"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat bg-black transition-all duration-700 ease-out filter lg:grayscale lg:group-hover:grayscale-0 group-hover:scale-105 z-0"
    ></div>

    <div
      class="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-50% to-transparent z-10 pointer-events-none"
    ></div>

    
    <div class="relative z-20 p-5 sm:p-6 flex flex-col gap-3">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-white text-xl sm:text-2xl font-bold tracking-tight group-hover:text-blue-400 transition-colors duration-300">
          {{ project.title }}
        </h3>
        <div class="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>

      
      <p class="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal">
        {{ project.description }}
      </p>

      
      <div v-if="project.techno && project.techno.length > 0" class="flex flex-wrap gap-2 pt-1">
        <UiBadgeSecondary
          v-for="tech in project.techno"
          :key="tech.id"
          :label="tech.title"
        />
      </div>
    </div>
  </article>
</template>
