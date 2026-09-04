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

        // Vider l'objet Touched
        touched.object = false;
        touched.mail = false;
        touched.content = false;
        touched.phoneNumber = false;
        touched.name = false;

    }
    catch (error) {
        errorMessage.value = "Une erreur est survenue lors de l'envoi de votre message."
    }
    finally {
        isSubmitting.value = false;
    }
}

//validations

const touched = reactive({
    object: false,
    mail: false,
    content: false,
    phoneNumber: false,
    name: false,
})

const isObjectValid = computed(() => {
    return form.object.length >= 3;
})

const isMailValid = computed(() => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(form.mail);
})

const isContentValid = computed(() => {
    return form.content.length >= 10;
})

const isPhoneNumberValid = computed(() => {
    return /^0[1-9](?:\d{2}){4}$/.test(form.phoneNumber);
})

const isNameValid = computed(() => {
    return form.name.length >= 3;
})

const isFormValid = computed(() => {
    return isObjectValid.value && isMailValid.value && isContentValid.value && isPhoneNumberValid.value && isNameValid.value;
})

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
    <main class=" min-h-screen gap-8 flex p-8 mt-24"
        :style="{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%)' }">

        <div class="flex flex-col xl:flex-row xl:gap-20 justify-center items-center mb-10">

            <section class="flex flex-col w-full 
                            xl:w-2/5">
    
                <div class="flex flex-col items-center gap-2 my-5 
                            xl:items-start ">
                    <UiTerminalText text="/* LET'S CONNECT */" :speed="100" :size="20" :colorText="'text-blue-500'"
                        :colorCursor="'bg-blue-300'" />
                    <h1 class="text-4xl font-heading my-6 text-white text-center drop-shadow-[0_5px_5px_rgba(59,130,246,0.8)] xl:text-start">Prêt à rejoindre votre équipe.</h1>
                    <p class="text-blue-300 text-lg text-center xl:text-start">Passionné par la création d'applications web,
                        je recherche une entreprise pour mon alternance. N'hésitez pas à m'envoyer un message pour que
                        l'on puisse discuter de notre future collaboration !</p>
                </div>
    
                <div class="flex flex-col items-center gap-8 my-10 
                            xl:items-start xl:my-0">
                    <div class="flex flex-col items-center gap-1 
                            xl:items-start ">
                        <span class="font-bold text-blue-500">Email</span>
                        <a href="mailto:alexandre.prigent@proton.me" class="text-white hover:text-blue-500 transition-colors">alexandre.prigent@proton.me</a>
                    </div>
    
                    <div class="flex flex-col items-center gap-1 
                            xl:items-start ">
                        <span class="font-bold text-blue-500">Basé à</span>
                        <p class="text-white">Lyon / Romans-sur-Isère, France</p>
                    </div>
                    <div class="flex flex-col items-center gap-2 
                            xl:items-start ">
                        <span class="font-bold text-blue-500">Mes réseaux</span>
                        <div class="flex gap-4">
                            <UiBadgePrimary to="https://github.com/Alex-beep-afk" linkText="Github" />
                            <UiBadgePrimary to="https://www.linkedin.com/in/prigent-alexandre/" linkText="LinkedIn" />
                        </div>
                    </div>
                </div>
            </section>
    
    
    
            <form @submit.prevent="submitForm"
                class=" w-full flex flex-col gap-10 p-8 border border-blue-500/20 rounded-3xl bg-gray-950/70 shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
                xl:max-w-xl ">
    
                <div class="grid grid-cols-2 gap-8 ">
                    <div>
                        <label for="name" class="text-blue-300/70 block mb-1">Nom</label>
                        <input id="name" 
                        v-model="form.name"
                        @blur="touched.name = true" 
                        @focus="successMessage = ''; errorMessage = ''"
                        type="text" 
                        required placeholder="Votre nom"
                        :class="{
                            'border-green-500 focus:ring-green-500 hover:border-green-500 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.25)]': touched.name && isNameValid,
                            'border-red-500 focus:ring-red-500 hover:border-red-500 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.25)]': touched.name && !isNameValid,
                            'border-white/10 focus:ring-blue-400/80 hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]': !touched.name,
                        }"
                        class="text-xs md:text-base text-white border w-full p-3 rounded-xl bg-gray-800 
                            focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out" />
                    </div>
                    <div>
                        <label for="object" class="text-blue-300/70 block mb-1">Objet</label>
                        <input 
                        @blur="touched.object = true" 
                        @focus="successMessage = ''; errorMessage = ''"
                        id="object" 
                        v-model="form.object" 
                        type="text" 
                        required 
                        placeholder="Objet de votre message"
                        :class="{
                            'border-green-500 focus:ring-green-500 hover:border-green-500 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.25)]': touched.object && isObjectValid,
                            'border-red-500 focus:ring-red-500 hover:border-red-500 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.25)]': touched.object && !isObjectValid,
                            'border-white/10 focus:ring-blue-400/80 hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]': !touched.object,
                        }"
                        class="text-xs md:text-base text-white border w-full p-3  rounded-xl bg-gray-800 
                            focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out" />
                    </div>
                    <div>
                        <label for="mail" class="text-blue-300/70 block mb-1">Email</label>
                        <input 
                        id="mail" 
                        @blur="touched.mail = true"
                        @focus="successMessage = ''; errorMessage = ''"
                        v-model="form.mail" 
                        type="email" 
                        required 
                        placeholder="Votre mail"
                        :class="{
                            'border-green-500 focus:ring-green-500 hover:border-green-500 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.25)]': touched.mail && isMailValid,
                            'border-red-500 focus:ring-red-500 hover:border-red-500 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.25)]': touched.mail && !isMailValid,
                            'border-white/10 focus:ring-blue-400/80 hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]': !touched.mail,
                        }"
                        class="text-xs md:text-base text-white border w-full p-3 rounded-xl bg-gray-800 
                            focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out" />
                    </div>
                    <div>
                        <label for="phoneNumber" class="text-blue-300/70 block mb-1">Téléphone</label>
                        <input 
                        id="phoneNumber" 
                        @blur="touched.phoneNumber = true"
                        @focus="successMessage = ''; errorMessage = ''"
                        v-model="form.phoneNumber" 
                        type="text" 
                        required
                        placeholder="Numéro de téléphone"
                        :class="{
                            'border-green-500 focus:ring-green-500 hover:border-green-500 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.25)]': touched.phoneNumber && isPhoneNumberValid,
                            'border-red-500 focus:ring-red-500 hover:border-red-500 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.25)]': touched.phoneNumber && !isPhoneNumberValid,
                            'border-white/10 focus:ring-blue-400/80 hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]': !touched.phoneNumber,
                        }"
                        class="text-xs md:text-base text-white border w-full p-3 rounded-xl bg-gray-800 
                            focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out" />
                    </div>
                </div>
                <div>
                    <label for="content" class="block mb-1 text-blue-300/70">Message</label>
                    <textarea 
                    id="content" 
                    @blur="touched.content = true" 
                    @focus="successMessage = ''; errorMessage = ''"
                    v-model="form.content" 
                    required 
                    rows="5" 
                    placeholder="Votre message"
                    :class="{
                        'border-green-500 focus:ring-green-500 hover:border-green-500 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.25)]': touched.content && isContentValid,
                        'border-red-500 focus:ring-red-500 hover:border-red-500 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.25)]': touched.content && !isContentValid,
                        'border-white/10 focus:ring-blue-400/80 hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]': !touched.content,
                    }"
                    class="text-white text-xs md:text-base border w-full p-3 rounded-xl bg-gray-800 
                        focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out"></textarea>
                </div>
    
                <ul>
                    <li class="flex gap-4 items-baseline" v-if="touched.name && !isNameValid">
                        <span class="h-1.5 w-1.5 rounded-full bg-red-300"></span>
                        <UiTerminalText text="Le nom doit contenir au moins 3 caractères." :speed="45" :size="14"
                            :colorText="'text-red-300'" :colorCursor="'bg-red-300'" :minHeight="'min-h-[0px]'"/>
                    </li>
                    <li class="flex gap-4 items-baseline" v-if="touched.object && !isObjectValid">
                        <span class="h-1.5 w-1.5 rounded-full bg-red-300"></span>
                        <UiTerminalText text="L'objet doit contenir au moins 3 caractères." :speed="45" :size="14"
                            :colorText="'text-red-300'" :colorCursor="'bg-red-300'" :minHeight="'min-h-[0px]'" />
                    </li>
                    <li class="flex gap-4 items-baseline" v-if="touched.mail && !isMailValid">
                        <span class="h-1.5 w-1.5 rounded-full bg-red-300"></span>
                        <UiTerminalText text="Le mail doit être valide." :speed="45" :size="14"
                            :colorText="'text-red-300'" :colorCursor="'bg-red-300'" :minHeight="'min-h-[0px]'" />
                    </li>
                    <li class="flex gap-4 items-baseline" v-if="touched.phoneNumber && !isPhoneNumberValid">
                        <span class="h-1.5 w-1.5 rounded-full bg-red-300"></span>
                        <UiTerminalText text="Le numéro de téléphone doit être valide. (ex: 0612345678)" :speed="45"
                            :size="14" :colorText="'text-red-300'" :colorCursor="'bg-red-300'" :minHeight="'min-h-[0px]'" />
                    </li>
                    <li class="flex gap-4 items-baseline" v-if="touched.content && !isContentValid">
                        <span class="h-1.5 w-1.5 rounded-full bg-red-300"></span>
                        <UiTerminalText text="Le message doit contenir au moins 10 caractères." :speed="45" :size="14"
                            :colorText="'text-red-300'" :colorCursor="'bg-red-300'" :minHeight="'min-h-[0px]'" />
                    </li>
                    <li class="flex gap-4 items-baseline justify-center">
                        <UiTerminalText v-if="successMessage" :text=successMessage :speed="100" :size="20"
                        :colorText="'text-green-300'" :colorCursor="'bg-green-300'" />
                    </li>
                    <li class="flex gap-4 items-baseline justify-center">
                        <UiTerminalText v-if="errorMessage" :text=errorMessage :speed="100"
                        :size="20" :colorText="'text-red-300'" :colorCursor="'bg-red-300'" />
                    </li>
                </ul>
               
                <button type="submit" :disabled="isSubmitting || !isFormValid"
                    class="relative overflow-hidden 
                    group px-8 py-3 font-bold text-blue-600 border-2 border-blue-600 
                    rounded-full transition-colors duration-300 hover:text-white"
                    :class ="{'cursor-not-allowed grayscale': !isFormValid || isSubmitting}">
                     
                    <span
                        class="absolute inset-0 bg-blue-600 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
    
                    <span class="relative z-10">{{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}</span>
                </button>
    
            </form>
        </div>
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