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
        console.log(form);
        const reponse = await $fetch(`${config.public.apiBaseUrl}/api/message_contacts`, {
            method: 'POST',
            headers: {
                Accept: 'application/ld+json',
                'Content-Type': 'application/ld+json'
            },
            body: form
        })

        successMessage.value = 'message envoyé avec succés !'

        //Vider le formulaire
        form.object = ''
        form.mail = ''
        form.content = ''
        form.phoneNumber = ''
        form.name = ''

    }
    catch (error) {
        errorMessage.value = "Une erreur est survenue lors de l'envoi de votre message."
        console.error("Détails de l'erreur :", error.data.detail)
    }
    finally {
        isSubmitting.value = false;
    }
}

</script>

<template>
    <main class="min-h-screen flex justify-evenly items-center">
        <section class="flex flex-col">
            <UiTerminalText text="/* LET'S CONNECT */" :speed="100" :size="52" />
            <h1 class="text-3xl font-bold mb-6">Contactez-moi</h1>
            <p class="text-blue-300 font-semibold text-center">Si vous avez un projet en tête ou si vous souhaitez
                simplement discuter, n'hésitez pas à me contacter !</p>
            <div class="flex flex-col ">
                <div class="flex flex-col gap-1">
                    <span>email</span>
                    <p>Alex-test@gmail.com</p>
                </div>

                <div class="flex flex-col gap-1">
                    <span>Basé à</span>
                    <p>Lyon, France</p>
                </div>
                <div class="flex flex-col gap-1">
                    <span>Mes reseaux</span>
                    <div class="flex gap-4">
                        <UiBadgePrimary to="#" linkText="Github" />
                        <UiBadgePrimary to="#" linkText="LinkedIn" />
                    </div>
                </div>
            </div>
        </section>



        <form @submit.prevent="submitForm"
            class=" w-full max-w-xl  flex flex-col gap-10 p-8 border border-blue-500/20 rounded-3xl bg-gray-950/70 shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] ">

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
            <div v-if="successMessage" class="bg-green-100 text-green-700 p-4 mb-4 rounded">
                {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="bg-red-100 text-red-700 p-4 mb-4 rounded">
                {{ errorMessage }}
            </div>
            <button type="submit" :disabled="isSubmitting"
                class="relative overflow-hidden group px-8 py-3 font-bold text-blue-600 border-2 border-blue-600 rounded-full transition-colors duration-300 hover:text-white">
                <span
                    class="absolute inset-0 bg-blue-600 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

                <span class="relative z-10">{{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}</span>
            </button>

        </form>
    </main>
</template>