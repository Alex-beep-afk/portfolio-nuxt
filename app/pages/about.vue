<script setup>
// Swapper

const textSwitcherState = ref(0);


let startX = 0;

const onPointerDown = (e) => {
  
  startX = e.clientX;
};

const onPointerUp = (e) => {
  
  const endX = e.clientX;
  
  const diffX = startX - endX;

  
  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      
      if (textSwitcherState.value < 2) {
        textSwitcherState.value++;
      }
    } else {
      
      if (textSwitcherState.value > 0) {
        textSwitcherState.value--;
      }
    }
  }
};



// Frise diplome/expérience

const friseState = ref(null);

const friseData = {
    diplomes: [
        {
            id: 0,
            title: 'CAP ébénisterie',
            date: '2009 - 2011',
            location: 'Lycée de l\'Elorn - Landerneau',
        },
        {
            id: 1,
            title: 'CAP Menuisier installateur',
            date: '2011 - 2012',
            location: 'Compagnons du devoir - Rennes',
        },
        {
            id: 2,
            title: 'Bac Pro Technicien menuisier agenceur',
            date: '2013 - 2015',
            location: 'Compagnons du devoir - Rennes',
        },
        {
            id: 3,
            title: 'Baccalauréat Général',
            date: '2015 - 2016',
            location: 'UBO - Brest',
        },
        {
            id: 4,
            title: 'TP - Developpeur web et web mobile',
            date: '2024 - 2025',
            location: 'CCI - Lyon 5e',
        }
    ],
    experiences: [
        {
            id: 0,
            title: 'Freelance en recherche d\'alternance',
            date: '2025 - En cours',
            location: 'APweb - Romans sur Isère',
        },
        {
            id: 1,
            title: 'Stage d\'études en développement web',
            date: '2025',
            location: 'Le Pigeon Voyageur - Nantes',
        },
        {
            id: 2,
            title: 'Stage d\'immersion dans le développement web',
            date: '2024',
            location: 'S3PWeb - Brest',
        },
        {
            id: 3,
            title: 'Superviseur Réseau',
            date: '2023 - 2024',
            location: 'L\'Ambassade Bretonne - France',
        },
        {
            id: 4,
            title: 'Manager/Gérant de restaurant',
            date: '2020 - 2023',
            location: 'L\'Ambassade Bretonne - Brest',
        },
        {
            id: 5,
            title: 'Saisonnier',
            date: '2018 - 2020',
            location: 'Aux petits Gourmands - Chamonix',
        },
        {
            id: 6,
            title: 'Responsable de rayon',
            date: '2016 - 2018',
            location: 'Mr Bricolage - Brest',
        },
        {
            id: 7,
            title: 'Manager de restaurant',
            date: '2015 - 2016',
            location: 'Subway - Brest',
        },
        {
            id: 8,
            title: 'Alternance TMA',
            date: '2013 - 2015',
            location: 'Menuiserie Delahaye - Rennes',
        },
        {
            id: 9,
            title: 'Apprenti menuisier',
            date: '2011 - 2012',
            location: 'Acti-service - Plouray',
        }
    ]
}

// Particules
const particles = ref([]);
const particleCount = 100;
let animationInterval;

const createParticle = () => {
    for (let i = 0; i < particleCount; i++) {
        particles.value.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: `rgba(59,130,246,${Math.random() * 0.8 + 0.2})`
        });
    }
}

const updateParticles = () => {
    particles.value.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > window.innerWidth) {
            particle.x = Math.random() * window.innerWidth;
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
            particle.y = Math.random() * window.innerHeight;
        }
    });
}

onMounted(() => {
    createParticle();
    animationInterval = setInterval(updateParticles, 16);
});

onUnmounted(() => {
    if (animationInterval) {
        clearInterval(animationInterval);
    }
})

</script>

<template>
    <main class="min-h-screen gap-8 flex flex-col items-center p-8 bg-scroll bg-center"
        :style="{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%) no-repeat center center fixed' }">

        <section class="flex flex-col items-center p-16 gap-8 rounded-2xl 
            backdrop-blur-xl border border-slate-400/50 overflow-hidden  md:w-1/2 md:p-16  
            ">

            <div class="max-w-[250px] pills-glow-blue rounded-2xl avatar-glow">
                <img class="max-w-full rounded-2xl" src="/medias/images/Alex.webp" alt="Avatar">
            </div>

            <div class="flex min-h-[250px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y" @pointerdown="onPointerDown"
                @pointerup="onPointerUp">

                <transition name="slide" mode="out-in">
                    <div v-if="textSwitcherState === 0" class="flex flex-col items-center justify-center text-white w-full">
                        <UiTerminalText :text="'Informations Générales'" :size="32" :speed="100" />
                        <div class="w-full h-[1px] bg-white my-4"></div>
                        <ul class="text-lg min-h-[170px]">
                            <li><span class="text-blue-500 font-semibold">Nom :</span> Prigent</li>
                            <li><span class="text-blue-500 font-semibold">Prénom :</span> Alexandre</li>
                            <li><span class="text-blue-500 font-semibold">Localisation :</span> Roman-sur-Isère</li>
                            <li><span class="text-blue-500 font-semibold">Métier :</span> Développeur web</li>
                        </ul>
                    </div>

                    <div v-else-if="textSwitcherState === 1"
                        class="text-white flex flex-col items-center justify-center w-full ">
                        <UiTerminalText :text="'ToolBox'" :size="32" />
                        <div class="w-full h-[1px] bg-white my-4"></div>
                        <ul class="text-lg min-h-[170px]">
                            <li><span class="text-blue-500 font-semibold">Symfony :</span> ⭐⭐⭐</li>
                            <li><span class="text-blue-500 font-semibold">Vue.js :</span> ⭐⭐⭐</li>
                            <li><span class="text-blue-500 font-semibold">Nuxt.js :</span> ⭐⭐</li>
                            <li><span class="text-blue-500 font-semibold">PHP :</span> ⭐⭐⭐</li>
                            <li><span class="text-blue-500 font-semibold">SQL :</span> ⭐⭐</li>
                            <li><span class="text-blue-500 font-semibold">Tailwind :</span> ⭐⭐⭐</li>
                           
                        </ul>
                    </div>

                    <div v-else-if="textSwitcherState === 2"
                        class="text-white flex flex-col items-center justify-center w-full">
                        <UiTerminalText :text="'Centres d\'intérêts'" :size="32" :speed="100" />
                        <div class="w-full h-[1px] bg-white my-4"></div>
                        <ul class="text-lg min-h-[170px]">
                            <li><span class="text-blue-500 font-semibold">Jeux vidéo</span></li>
                            <li><span class="text-blue-500 font-semibold">Randonnée</span></li>
                            <li><span class="text-blue-500 font-semibold">Bricolage</span></li>
                            <li><span class="text-blue-500 font-semibold">Cuisine</span></li>
                        </ul>
                    </div>
                </transition>

            </div>

            <div class="flex items-center gap-4">
                <span @click="textSwitcherState = 0" :class="textSwitcherState === 0 ? 'bg-blue-500 ring-2 ring-blue-400' : 'bg-blue-500/50'"
                    class="w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out"></span>
                <span @click="textSwitcherState = 1" :class="textSwitcherState === 1 ? 'bg-blue-500 ring-2 ring-blue-400' : 'bg-blue-500/50'"
                    class="w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out"></span>
                <span @click="textSwitcherState = 2" :class="textSwitcherState === 2 ? 'bg-blue-500 ring-2 ring-blue-400' : 'bg-blue-500/50'"
                    class="w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out"></span>
            </div>
        </section>
        <section class="flex flex-col py-8">

            <h2 class="text-2xl text-center text-white font-heading">Qui suis-je ?</h2>
            <div class="w-full h-[1px] bg-white my-4"></div>
            <p class="text-white text-lg text-center">
                Phasellus tincidunt ligula sed ornare gravida. Sed consectetur sit amet mi quis pretium. Aenean
                accumsan dignissim erat. Ut non felis ut mi pretium egestas et vitae lectus. Aliquam sed
                scelerisque metus, quis pretium odio. Integer ultricies est non odio dignissim, quis laoreet elit
                ullamcorper. Curabitur dapibus tempus massa, et pretium sapien lacinia et. Duis sed nulla auctor ipsum
                maximus iaculis ut vel nunc. Phasellus vestibulum, justo quis semper viverra, sapien nibh viverra
                felis, quis aliquet elit diam et elit. Aliquam bibendum ligula nec libero gravida, a mattis nunc
                ultrices. Vivamus ac libero et sem sodales rutrum ac sed mi. Aliquam erat volutpat. Maecenas leo sem,
                porta vel feugiat sed, eleifend ac ante. Morbi quis imperdiet enim, sit amet lacinia nunc.
            </p>

        </section>

        <section class="flex flex-col pt-8 h-auto">
            <h2 class="text-2xl text-white font-heading text-center">Mon parcours</h2>
            <div class="w-full h-[1px] bg-white my-4"></div>

            <div class="flex justify-center items-center gap-8 my-4 ">
                <UiBadgeSecondary label="Diplomes" @click="friseState = 'diplomes'"
                    :isActive="friseState === 'diplomes'"></UiBadgeSecondary>
                <UiBadgeSecondary label="Experiences" @click="friseState = 'experiences'"
                    :isActive="friseState === 'experiences'"></UiBadgeSecondary>
            </div>


            <div v-if="friseState === 'diplomes'" class="flex flex-col gap-8 items-center py-8 h-full">
                <UiScrollReveal :once="true" v-for="diplome in friseData.diplomes" :key="diplome.id" class="w-full">
                    <div class="flex flex-col items-center gap-8 ">
                        <div
                            class="flex flex-col items-center p-4 rounded-md border-2 border-white/20 avatar-glow w-full min-h-[120px]">
                            <UiTerminalText :text="diplome.title" size="24"></UiTerminalText>
                            <p>{{ diplome.date }}</p>
                            <p>{{ diplome.location }}</p>
                        </div>
                        <div v-if="diplome.id !== (friseData.diplomes.length - 1)" class="h-[100px] w-[2px] bg-white">
                        </div>
                    </div>
                </UiScrollReveal>
                <UiBadgeSecondary label="X" @click="friseState = ''"></UiBadgeSecondary>
            </div>



            <div v-if="friseState === 'experiences'" class="flex flex-col gap-8 items-center h-full py-8 ">
                <UiScrollReveal :once="true" v-for="experience in friseData.experiences" :key="experience.id"
                    class="w-full">
                    <div class="flex flex-col items-center gap-8 ">
                        <div
                            class="flex flex-col items-center p-4 rounded-md border-2 border-white/20 avatar-glow w-full min-h-[120px] ">
                            <UiTerminalText :text="experience.title" size="24"></UiTerminalText>
                            <p>{{ experience.date }}</p>
                            <p>{{ experience.location }}</p>
                        </div>
                        <div v-if="experience.id !== (friseData.experiences.length - 1)"
                            class="h-[100px] w-[2px] bg-white"></div>
                    </div>
                </UiScrollReveal>
                <UiBadgeSecondary label="X" @click="friseState = ''"></UiBadgeSecondary>
            </div>

            <div class="w-full h-[1px] bg-white mt-4 mb-8"></div>

            <div class="flex gap-6 justify-center my-8">
                <UiButtonPrimary label="Télécharger mon CV"></UiButtonPrimary>
                <UiButtonSecondary label="Me contacter">Contact</UiButtonSecondary>
            </div>



        </section>

        <div v-for="(particle, index) in particles" :key="index" :style="{
            position: 'fixed',
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: particle.color,
            zIndex: -1,
            pointerEvents: 'none',
            opacity: 1
        }"></div>
    </main>
</template>
