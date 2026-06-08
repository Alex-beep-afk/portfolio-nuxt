<template>
   <div class="w-full h-full flex flex-col gap-5 ">
          <div class="overflow-hidden w-full h-96 border border-slate-400/50 hover:border-blue-500 rounded-3xl ">
            <img class="w-full object-cover hover:scale-110 transition-all duration-500 ease-in-out object-center origin-center"
              src="/medias/images/image3.webp" :alt="'image du projet' + title">
          </div>
          <h3 class="text-white text-5xl font-bold">{{ title }}</h3>
          <p class="text-blue-300 font-semibold text-lg">{{ description }}</p>
          <ul class="flex gap-5">
            <li class="text-blue-500 font-bold text-xl border border-slate-400/50 rounded-full px-5 py-2"
              v-for="tech in technologies" :key="tech.id">
              {{ tech }}
            </li>
          </ul>
          <a class="text-blue-500 font-bold text-xl cursor-pointer hover:text-white transition-all duration-500 ease-in-out underline-offset-4 hover:underline"
            :href="link">Voir le projet -> </a>
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