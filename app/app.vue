<template>
  <main class="min-h-screen bg-gradient-to-r from-black from-[20%] via-black via-[50%] to-transparent">
    <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover -z-10 ">

      <source src="/medias/backgroundFolio.mp4" type="video/mp4">
    </video>


    <section class="px-16 h-screen">
      <div class="w-3/5 flex flex-col gap-10 justify-center h-full">

        <p class="text-blue-500 font-bold">// Hello World ! </p>
        <h1 class="text-7xl font-bold text-white ">Création <span class="text-blue-500">d'experiences</span> digitales
          avec précision .</h1>
        <p class="text-blue-300 font-semibold text-lg">Je suis devellopeur junior spécialisé en développement web et
          mobile. Passionné par les
          nouvelles technologies et l'innovation, je cherche constamment à repousser les limites de ce qui est
          possible.
          Je suis également un joueur passionné et un amateur de café, deux passions qui influencent mon approche
          créative
          et ma motivation.</p>
        <div class="flex gap-5">

          <button
            class="bg-white p-5 font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out">Voir
            mes projets</button>
          <button
            class="bg-black p-5 font-bold text-white rounded-full border border-slate-400/30 hover:bg-white/10 transition-all duration-500 ease-in-out">Me
            contacter</button>

        </div>

      </div>


    </section>

    <section class="p-16 bg-gray-800 min-h-screen flex flex-col gap-16">
      <div class="flex justify-between h-1/6">
        <div class="flex flex-col gap-4">
          <h2 class="text-white text-5xl font-bold">Mon travail Hello</h2>
          <p class="text-blue-300 font-semibold text-lg">Decouvrez mes differents projets et mes experiences
            professionnelles.</p>
        </div>

        <div class="text-blue-500 font-bold text-xl flex items-end p-5">
          <a class="cursor-pointer hover:text-white transition-all duration-500 ease-in-out underline-offset-4 hover:underline"
            href="#">Voir tous mes projets -> </a>
        </div>
      </div>

      <div class="grid grid-cols-2 grid-rows-2 gap-12 w-full h-2/3 ">
        
        <ProjectCard v-for="project in displayProjects" :key="project.title" :title="project.title" :description="project.description" :technologies="project.technologies" :link="project.link" />

      </div>


    </section>

    <section class="bg-black border-y border-slate-400/30 p-16 flex flex-col gap-16">
      <div class="flex flex-col gap-4">
        <h2 class="text-white text-5xl font-bold">Ma stack</h2>
        <p class="text-blue-300 font-semibold text-lg">Decouvrez mes differents projets et mes experiences
          professionnelles.</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 px-16">
        <div v-for="tech in techStack" :key="tech.id" class="p-8 bg-slate-900/50 rounded-2xl border border-white/5 flex flex-col items-center transition-all hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]">
          <div class="border border-slate-400/50 bg-slate-900 rounded-2xl p-4">
            <img :src="tech.logo" :alt="tech.name" class="w-24 h-24 object-contain ">
          </div>
          <h3 class="text-white text-lg font-bold">{{ tech.name }}</h3>
        </div>
      </div>
    </section>

    <section class="flex justify-between p-32 bg-black border-b border-slate-400/30">
      <p class="text-m font-semibold text-slate-200/50">ABOUT <span class="text-blue-500">ME</span></p>
      <div class="flex flex-col gap-4 w-1/2">
        <p class="text-white font-semibold text-xl">Actuellement en reconversion professionnelle, je suis à la recherche d'une alternance pour mettre en pratique mes compétences et acquérir de nouvelles connaissances.</p>
        <p class="text-blue-300 font-semibold italic text-lg">"La créativité c'est l'intelligence qui s'amuse " - Albert Einstein</p>
      </div>

    </section>

    <section class="flex justify-between p-32 bg-black border-b border-slate-400/30">
      <div class="flex flex-col gap-4 w-1/2">
        <p class="text-m font-semibold text-slate-200/50">LET'S <span class="text-blue-500">CONNECT</span></p>
        <p class="text-white font-semibold text-5xl">Travaillons ensemble !</p>
        
      </div>

      <div class="flex flex-col gap-4 justify-center items-start">
        <p class="text-white font-semibold text-xl">Alexandre.prigent@proton.me</p>
        <ul class="text-blue-300 font-semibold flex gap-4 ">
          <li class="cursor-pointer hover:text-white transition-all duration-500 ease-in-out"><a href="https://github.com/EwanB22">GitHub</a></li>
          <li class="cursor-pointer hover:text-white transition-all duration-500 ease-in-out"><a href="https://linkedin.com">LinkedIn</a></li>
        </ul>
      </div>

    </section>
  </main>

</template>

<script setup>

const projects = ref([
  {
    "title": "Application le pigeonnier",
    "description": "Une application permettant la visibilité de l'association le pigeonnier et de ses membres. ",
    "technologies": [
      "vue",
      "tailwind",
      "symfony"
    ],
    "link": "https://github.com/EwanB22/le_pigeonnier_app"
  },
  {
    "title": "Application youtube",
    "description": "Application permettant de cloner l'interface de youtube. ",
    "technologies": [
      "vue",
      "tailwind",
      "symfony"
    ],
    "link": "https://github.com/EwanB22/le_pigeonnier_app"
  },
  {
    "title": "Application facebook",
    "description": "Application permettant de cloner l'interface de facebook. ",
    "technologies": [
      "vue",
      "tailwind",
      "symfony"
    ],
    "link": "https://github.com/EwanB22/le_pigeonnier_app"
  },
  {
    "title": "Application NexusFolio",
    "description": "Builder de portfolio developpement web et mobile. ",
    "technologies": [
      "twig",
      "symfony"
    ],
    "link": "https://github.com/EwanB22/NexusFolio"
  },
  {
    "title": "Application weddingPimper",
    "description": "Application de faire-part de mariage numérique. ",
    "technologies": [
      "vue",
      "tailwind",
      "symfony"
    ],
    "link": "https://github.com/EwanB22/le_pigeonnier_app"
  },
  {
    "title": "Eat A Day",
    "description": "Application de gestion de repas pour les étudiants. ",
    "technologies": [
      "html",
      "css",
      "javascript"
    ],
    "link": "https://github.com/EwanB22/Eat-A-Day-JS-HTML-CSS"
  },
  {
    "title": "Application myWorld trip ",
    "description": "Application permettant le partage de voyage entre amis. ",
    "technologies": [
      "html",
      "css",
      "javascript"
    ],
    "link": "https://github.com/EwanB22/le_pigeonnier_app"
  },
  {
    "title": "Bookly",
    "description": "Application mobile de gestion de bibliotheque. ",
    "technologies": [
      "flutter"
    ],
    "link": "https://github.com/EwanB22/Bookly-Flutter-App"
  },

])

const techStack = [
  {
    name: "Vue",
    logo: "https://img.icons8.com/fluency/48/vuejs.png",
  },
  {
    name: "Tailwind",
    logo: "https://img.icons8.com/color/48/tailwind_css.png",
  },
  {
    name: "Symfony",
    logo: "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-symfony-is-a-php-web-application-framework-logo-bold-tal-revivo.png",
  },
  {
    name: "Twig",
    logo: "https://img.icons8.com/external-others-inmotus-design/67/external-Plant-round-icons-others-inmotus-design-3.png",
  },
  {
    name: "HTML",
    logo: "https://img.icons8.com/color/48/html-5--v1.png",
  },
  {
    name: "CSS",
    logo: "https://img.icons8.com/fluency/48/css3.png",
  },
  {
    name: "JavaScript",
    logo: "https://img.icons8.com/fluency/48/javascript.png",
  },
  {
    name: "Python",
    logo: "https://img.icons8.com/color/48/python--v1.png" ,
  },
]
const displayProjects = computed(() => {
  return projects.value.slice(0, 4);
})


</script>