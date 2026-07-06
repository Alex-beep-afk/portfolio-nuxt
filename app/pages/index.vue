<script setup>

const config = useRuntimeConfig()

// useFetch est la fonction de Nuxt pour appeler une API
const { data, error } = await useFetch(`${config.public.apiBaseUrl}/api/projects`, {
  server: false,
  headers: {
    Accept: 'application/ld+json' // On demande le format API Platform
  }
})

const { data: techData, error: techError } = await useFetch(`${config.public.apiBaseUrl}/api/technos`, {
  server: false,
  headers: {
    Accept: 'application/ld+json' // On demande le format API Platform
  }
})

const displayProjects = computed(() => {
  return data.value ? data.value.member : []
})

const displayTechs = computed(() => {
  return techData.value ? techData.value.member : []
})

const isModalOpen = ref(false)

const selectedProject = ref(null)

const openModalProject = (project) => {
  selectedProject.value = project
  isModalOpen.value = true
}

</script>

<template>
  <Header />
  <main class="min-h-screen bg-gradient-to-r from-black from-[20%] via-black via-[50%] to-transparent">
    <video autoplay loop muted playsinline class="absolute w-full h-full object-cover -z-10 ">

      <source src="/medias/backgroundFolio.mp4" type="video/mp4">
    </video>


    <section class="px-8 py-16 lg:p-16 h-screen">
      <div class="xl:w-3/5 xl:justify-center items-center flex flex-col gap-10 h-full">

        <ScrollReveal>
          <TerminalText text="// Bienvenue sur mon portfolio !" :speed="200" :size="24" />
        </ScrollReveal>

        <h1 class="xl:text-7xl text-center text-lg font-bold text-white font-heading">Création <span
            class="text-blue-500">d'experiences</span> digitales
          avec précision .</h1>
        <p class="text-blue-300 font-semibold text-lg text-center">Je suis devellopeur junior spécialisé en
          développement web et
          mobile. Passionné par les
          nouvelles technologies et l'innovation, je cherche constamment à repousser les limites de ce qui est
          possible.
          Je suis également un joueur passionné et un amateur de café, deux passions qui influencent mon approche
          créative
          et ma motivation.</p>
        <div class="flex gap-5">

          <button
            class="relative overflow-hidden group px-8 py-3 font-bold text-blue-600 border-2 border-blue-600 rounded-full transition-colors duration-300 hover:text-white">
            <span
              class="absolute inset-0 bg-blue-600 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

            <span class="relative z-10">Voir mes projets</span>

          </button>

          <button class="bg-black p-5 font-bold text-white rounded-full border border-slate-400/30 hover:bg-white/10
          transition-colors duration-500 ease-in-out ">Me
            contacter</button>

        </div>

      </div>
    </section>

    <section class="px-8 py-16 lg:p-16 bg-gray-800 flex flex-col gap-16 relative">

      <div class="h-16 bg-gradient-to-b from-transparent to-gray-800 w-full absolute right-0 -top-16">
      </div>

      <div class="flex flex-col md:flex-row md:justify-between md:items-start h-1/6 gap-5">
        <div class="flex flex-col justify-center items-center md:items-start gap-4 min-h-[120px]">

          <ScrollReveal>
            <TerminalText text=" <!-- Mon travail -->" :speed="100" :size="52" />
          </ScrollReveal>

          <p class="text-blue-300 font-semibold text-lg text-center md:text-start">Decouvrez mes differents projets et
            mes experiences
            professionnelles.</p>
        </div>

        <button
          class="relative overflow-hidden group px-8 py-3 font-bold text-blue-600 border-2 border-blue-600 rounded-full transition-colors duration-300 hover:text-white">
          <span
            class="absolute inset-0 bg-blue-600 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          <span class="relative z-10">Voir tout mes projets</span>
        </button>
      </div>

      <div class="grid grid-cols-1 grid-rows-auto lg:grid-cols-2 lg:grid-rows-2 gap-20 lg:gap-16 w-full">

        <ProjectCard @showProject="openModalProject(project)" v-for="project in displayProjects" :key="project.id"
          :title="project.title" :description="project.description" :techno="project.techno" :link="project.link"
          :image="project.coverImage?.contentUrl" />

      </div>

      <div class="h-16 bg-gradient-to-t from-transparent to-gray-800 w-full absolute right-0 -bottom-16">
      </div>
    </section>

    <section class="bg-black border-y border-slate-400/30 px-8 py-32 lg:px-16 flex flex-col gap-16">
      <div class="flex flex-col justify-center items-center md:justify-start md:items-start gap-4">
        <ScrollReveal>
          <TerminalText text="/* Ma toolbox */" :speed="100" :size="52" />
        </ScrollReveal>
        <p class="text-blue-300 font-semibold text-center md:text-start text-lg">Decouvrez mes differents projets et mes experiences
          professionnelles.</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 ">

        <div v-for="tech in displayTechs" :key="tech.id"
          class="p-8 bg-slate-900/50 rounded-2xl border border-white/5 flex flex-col items-center transition-all hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]">
          <div class="border border-slate-400/50 bg-slate-900 rounded-2xl w-24 h-24">

            <img v-if="tech.logo" :src="`${config.public.apiBaseUrl}${tech.logo.contentUrl}`" :alt="tech.title"
              class=" object-cover rounded-2xl">
          </div>
          <h3 class="text-white  text-lg font-bold">{{ tech.title }}</h3>
        </div>
      </div>
    </section>

    <section
      class="flex flex-col justify-between px-8 py-16  bg-black border-b border-slate-400/30 gap-10 lg:px-16 lg:py-32">
      <p class="text-m font-semibold text-slate-200/50">ABOUT <span class="text-blue-500">ME</span></p>
      <div class="flex flex-col gap-4 w-full md:w-1/2">
        <p class="text-white font-semibold text-xl">Actuellement en reconversion professionnelle, je suis à la recherche
          d'une alternance pour mettre en pratique mes compétences et acquérir de nouvelles connaissances.</p>
        <p class="text-blue-300 font-semibold italic text-lg">"La créativité c'est l'intelligence qui s'amuse " - Albert
          Einstein</p>
      </div>

    </section>

    <section
      class="flex flex-col md:flex-row justify-between px-8 py-16  bg-black border-b border-slate-400/30 gap-10 lg:px-16 lg:py-32">
      <div class="flex flex-col gap-4 w-full md:w-1/2">
        <p class="text-m font-semibold text-slate-200/50">LET'S <span class="text-blue-500">CONNECT</span></p>
        <p class="text-white font-semibold text-5xl">Travaillons ensemble !</p>

      </div>

      <div class="flex flex-col gap-4 justify-center items-start">
        <p class="text-white font-semibold text-xl">Alexandre.prigent@proton.me</p>
        <ul class="text-blue-300 font-semibold flex gap-4 ">
          <li class="cursor-pointer hover:text-white transition-all duration-500 ease-in-out"><a
              href="https://github.com/EwanB22">GitHub</a></li>
          <li class="cursor-pointer hover:text-white transition-all duration-500 ease-in-out"><a
              href="https://linkedin.com">LinkedIn</a></li>
        </ul>
      </div>

    </section>
  </main>

  <ProjectModal v-if="isModalOpen" :project="selectedProject" @close="isModalOpen = false" />

  <Footer />

</template>
