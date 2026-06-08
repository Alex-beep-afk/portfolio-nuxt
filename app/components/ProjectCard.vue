<template>
  <div class="w-full h-full flex flex-col gap-5 ">
    <div class="overflow-hidden w-full h-96 border border-slate-400/50 hover:border-blue-500 rounded-3xl ">
      <img
        class="w-full h-full object-cover hover:scale-110 transition-all duration-500 ease-in-out object-center origin-center"
        src="/medias/images/image3.webp" :alt="'image du projet' + title">
    </div>
    <h3 class="text-white text-3xl font-bold text-center md:text-left">{{ title }}</h3>
    <p class="text-blue-300 font-semibold text-lg text-center md:text-left">{{ description }}</p>
    <div class="flex flex-col md:flex-row justify-between items-center gap-5">

      <ul class="flex gap-5">
        <li class="text-blue-500 font-bold text-xl border border-slate-400/50 rounded-full px-5 py-2 bg-white"
          v-for="tech in technologies" :key="tech.id">
          {{ tech }}
        </li>
      </ul>
      <AnimatedLink :to="link">Voir le projet --> </AnimatedLink>
    </div>
  </div>
</template>

<script setup>
// defineProps est la fonction qui permet de dire : 
// "Ce composant s'attend à recevoir ces données de l'extérieur"
defineProps({
  title: String,
  description: String,
  technologies: Array,
  link: String
})
</script>