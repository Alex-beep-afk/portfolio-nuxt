<script setup>

const config = useRuntimeConfig();

const form = reactive({
    object: '',
    mail: '',
    content: '',
    phoneNumber: '',
    name: '',
})

const isSubmitting = ref(false);

const successMessage = ref('');

const errorMessage = ref('');

const submitForm = async () => {
    isSubmitting.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    try {
        const reponse = await $fetch(`${config.public.apiBaseUrl}/api/message_contacts`, {
            method: 'POST',
            headers: {
                Accept: 'application/ld+json',
                'Content-Type': 'application/ld+json'
            },
            body: form
        })

        successMessage.value = 'Message envoyé avec succés !'

        //Vider le formulaire
        form.object = ''
        form.mail = ''
        form.content = ''
        form.phoneNumber = ''
        form.name = ''

    }
    catch (error) {
        errorMessage.value = "Une erreur est survenue lors de l'envoi de votre message."
    }
    finally {
        isSubmitting.value = false;
    }
}

//Particules

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
    <main class="min-h-screen gap-8 lg:gap-0 flex-col flex lg:flex-row lg:justify-evenly lg:items-center p-8"
        :style="{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%)' }">
        <section class="flex flex-col w-full lg:w-2/5">
            <div class="flex flex-col gap-2 my-5 lg:items-start">
                <UiTerminalText text="/* LET'S CONNECT */" :speed="100" :size="20" :colorText="'text-blue-500'"
                    :colorCursor="'bg-blue-300'" />
                <h1 class="text-4xl font-bold font-heading my-6 text-white text-center lg:text-start">Prêt à rejoindre votre équipe.</h1>
                <p class="text-blue-300 text-lg text-center lg:text-start">Passionné par la création d'applications web,
                    je cherche une entreprise pour mon alternance. N'hésitez pas à m'envoyer un message pour que
                    l'on puisse discuter de notre future collaboration !</p>
            </div>

            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <span class="font-bold text-blue-500">Email</span>
                    <p class="text-white">Alex-test@gmail.com</p>
                </div>

                <div class="flex flex-col gap-1">
                    <span class="font-bold text-blue-500">Basé à</span>
                    <p class="text-white">Lyon, France</p>
                </div>
                <div class="flex flex-col gap-2">
                    <span class="font-bold text-blue-500">Mes reseaux</span>
                    <div class="flex gap-4">
                        <UiBadgePrimary to="#" linkText="Github" />
                        <UiBadgePrimary to="#" linkText="LinkedIn" />
                    </div>
                </div>
            </div>
        </section>



        <form @submit.prevent="submitForm"
            class=" w-full lg:max-w-xl flex flex-col gap-10 p-8 border border-blue-500/20 rounded-3xl bg-gray-950/70 shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]">

            <div class="grid grid-cols-2 gap-8 ">
                <div>
                    <label for="name" class="text-blue-300/70 block mb-1">Nom</label>
                    <input id="name" v-model="form.name" type="text" required placeholder="Votre nom"
                        class="text-white border w-full p-3 border-white/10 rounded-xl bg-gray-800 
                        focus:outline-none focus:ring-2 focus:ring-blue-400/80 
                        hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out" />
                </div>
                <div>
                    <label for="object" class="text-blue-300/70 block mb-1">Objet</label>
                    <input id="object" v-model="form.object" type="text" required placeholder="Objet de votre message"
                        class="text-white border w-full p-3 border-white/10 rounded-xl 
                        focus:outline-none focus:ring-2 focus:ring-blue-400/80 bg-gray-800 
                        hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out" />
                </div>
                <div>
                    <label for="mail" class="text-blue-300/70 block mb-1">Email</label>
                    <input id="mail" v-model="form.mail" type="email" required placeholder="Votre mail"
                        class="text-white border w-full p-3 border-white/10 rounded-xl 
                        focus:outline-none focus:ring-2 focus:ring-blue-400/80 bg-gray-800 
                        hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out" />
                </div>
                <div>
                    <label for="phoneNumber" class="text-blue-300/70 block mb-1">Numéro de téléphone</label>
                    <input id="phoneNumber" v-model="form.phoneNumber" type="text" required
                        placeholder="Votre numéro de téléphone"
                        class="text-white border w-full p-3 border-white/10 rounded-xl 
                        focus:outline-none focus:ring-2 focus:ring-blue-400/80 bg-gray-800 
                        hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out" />
                </div>
            </div>
            <div>
                <label for="content" class="block mb-1 text-blue-300/70">Message</label>
                <textarea id="content" v-model="form.content" required rows="5" placeholder="Votre message"
                    class="text-white border w-full border-white/10 p-3 border-white/10 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-blue-400/80 bg-gray-800 
                    hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out"></textarea>
            </div>

            

            <UiTerminalText v-if="successMessage" :text=successMessage :speed="100" :size="20"
                :colorText="'text-green-300'" :colorCursor="'bg-green-300'" />



            <UiTerminalText v-if="errorMessage" :text=errorMessage :speed="100"
                :size="20" :colorText="'text-red-300'" :colorCursor="'bg-red-300'" />
            <button type="submit" :disabled="isSubmitting"
                class="relative overflow-hidden group px-8 py-3 font-bold text-blue-600 border-2 border-blue-600 rounded-full transition-colors duration-300 hover:text-white">
                <span
                    class="absolute inset-0 bg-blue-600 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

                <span class="relative z-10">{{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}</span>
            </button>

        </form>
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