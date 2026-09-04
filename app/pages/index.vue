<script setup>

const config = useRuntimeConfig();

//Appel Api pour les projets
const { projects, fetchProjects } = useProjects();
await fetchProjects();

// Appel Api pour les technos 
const { data: techData, error: techError } = await useFetch(`${config.public.apiBaseUrl}/api/technos?active=true`, {
  server: false,
  headers: {
    Accept: 'application/ld+json'
  }
})


const displayedProjects = computed(() => {
  return projects.value.slice(0, 4)
})

const displayTechs = computed(() => {
  return techData.value ? techData.value.member : []
})





// Gestion de la arrowbulle
const { arrivedState } = useScroll(typeof window !== 'undefined' ? window : null)

</script>

<template>
  <main class="min-h-screen bg-gradient-to-r from-black from-[20%] via-black via-[50%] to-transparent">
    <video autoplay loop muted playsinline class="absolute w-full h-full object-cover -z-10">

      <source :src="'/medias/backgroundFolio.mp4'" type="video/mp4">
    </video>


    <section class="p-8 lg:p-16 h-screen">

      <div class="flex flex-col items-center gap-10 h-full justify-center xl:w-3/5 xl:gap-10">

        <UiScrollReveal>
          <UiTerminalText text="// Bienvenue sur mon portfolio !" :speed="100" :size="24" />
        </UiScrollReveal>

        <h1 class="text-center text-xl font-bold text-white font-heading xl:text-6xl">Création <span
            class="text-blue-500">d'expériences</span> digitales
          avec précision</h1>

        <p class="text-blue-300 font-semibold text-center xl:text-xl">Dévelopeur junior spécialisé en
          développement web et
          web mobile. Passionné par les
          nouvelles technologies et l'innovation, je cherche activement une alternance afin de developper mes
          compétences,
          contribuer à des projets innovants et apprendre de nouvelles technologies. Je suis également un joueur
          passionné et un grand amateur de café, deux passions
          qui influencent mon approche créative
          et ma motivation.
        </p>

        <div class="flex gap-5 items-center">

          <UiButtonPrimary label="Voir mes projets" to="/projects" />

          <UiButtonSecondary label="Me contacter" to="/contact" />

        </div>

      </div>
    </section>

    <section class="p-12 lg:p-16 bg-black flex flex-col gap-16 relative mb-16">

      <div class="h-16 bg-gradient-to-b from-transparent to-black w-full absolute right-0 -top-16">
      </div>

      <div class="flex flex-col items-center h-1/6 gap-5
      lg:flex-row lg:justify-between lg:items-start ">

        <div class="flex flex-col justify-center items-center gap-4 min-h-[120px] 
                    lg:items-start ">

          <UiScrollReveal>
            <UiTerminalText text=" <!-- Mon travail -->" :speed="100" :size="52" />
          </UiScrollReveal>

          <p class="text-blue-300 font-semibold text-lg text-center lg:text-start">Découvrez mes différents projets et
            mes expériences
            professionnelles.</p>
        </div>

        <UiButtonPrimary label="Voir tous mes projets" to="/projects" />

      </div>

      <SectionGridProjects :projects="displayedProjects" />


    </section>

    <section class="bg-black border-y border-slate-400/30 p-12 lg:px-16 flex flex-col gap-16 ">
      <div class="flex flex-col justify-center items-center md:justify-start md:items-start gap-4">
        <UiScrollReveal>
          <UiTerminalText text="/* Ma toolbox */" :speed="100" :size="52" />
        </UiScrollReveal>
        <p class="text-blue-300 font-semibold text-center md:text-start text-lg">Découvrez mes différents projets et mes
          expériences
          professionnelles.</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 ">

        <TechCard v-for="tech in displayTechs" :key="tech.id" :tech="tech" />

      </div>
    </section>

    <section
      class="flex flex-col 
      md:flex-row items-center justify-between 
      px-8 py-16  bg-black border-b border-slate-400/30 gap-10 lg:px-16 lg:py-32">

      <div class="flex flex-col items-center md:items-start gap-4 w-full md:w-1/2">
        <p class="text-2xl font-semibold text-slate-200/50">ABOUT <span class="text-blue-500">ME</span></p>
        <p class="text-white font-semibold text-lg text-center md:text-start">Actuellement titulaire d'un
          diplôme en développement web et web mobile, je suis à la recherche
          d'une alternance pour approfondir mes compétences et acquérir de nouvelles connaissances.</p>
      </div>

      <UiButtonPrimary label="A propos de moi" to="/about" />

    </section>

    <section
      class="flex flex-col md:flex-row justify-between items-center px-8 py-16  bg-black border-b border-slate-400/30 gap-10 lg:px-16 lg:py-32">
      <div class="flex flex-col items-center md:items-start gap-4 w-full md:w-1/2">
        <p class="text-2xl font-semibold text-slate-200/50">LET'S <span class="text-blue-500">CONNECT</span></p>
        <p class="text-white font-semibold text-3xl lg:text-4xl font-heading">Travaillons ensemble !</p>

      </div>


      <UiButtonSecondary label="Me contacter" to="/contact" />


    </section>

    <div
      class="sticky bottom-0 z-50 text-blue-500 flex items-center justify-center animate-bounce overflow-hidden transition-all duration-500 ease-in-out "
      :class="arrivedState.top ? 'max-h-24 p-2 opacity-100' : 'max-h-0 p-0 opacity-0'">
      <span class="backdrop-blur-sm p-2 rounded-full shadow-[inset_0_0_20px_rgba(59,130,246,0.5)] ">
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 32 32">
          <path d="M0 0h32v32H0z" fill="none" />
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
            d="m6 22l10 8l10-8m-10 8V2" />
        </svg>
      </span>
    </div>
  </main>

</template>
