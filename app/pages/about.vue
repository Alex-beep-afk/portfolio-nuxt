<script setup>
import { transition } from '@vueuse/core';

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
    <main class="min-h-screen gap-8 flex-col flex p-8 bg-scroll bg-center"
        :style="{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%) no-repeat center center fixed' }">
        <section class="flex flex-col items-center p-8 gap-8 rounded-2xl backdrop-blur-xl border border-slate-400/50 md:flex-row md:p-16 md:items-start ">
            <div class="max-w-[250px] pills-glow-blue rounded-2xl avatar-glow">
                <img class="max-w-full rounded-2xl" src="/medias/images/Alex.webp" alt="Avatar">
            </div>
            <div class="text-white">
                <h2 class="text-2xl font-bold">Infos générales</h2>
                <div class="w-full h-[1px] bg-white my-4"></div>
                <ul class="text-lg">
                    <li>Nom: Prigent</li>
                    <li>Prénom: Alexandre</li>
                    <li>Âge: 34 ans</li>
                    <li>Métier: Développeur web</li>
                </ul>
            </div>
        </section>
        <section class="flex flex-col py-8">

            <h2 class="text-2xl text-center text-white font-bold">Qui suis-je ?</h2>
            <div class="w-full h-[1px] bg-white my-4"></div>
            <p class="text-white">
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
        <section class="flex flex-col py-8 h-auto">
            <h2 class="text-2xl text-white font-bold text-center">Mon parcours</h2>
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
