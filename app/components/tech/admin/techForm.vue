<script setup>

const config = useRuntimeConfig();
const baseUrl = config.public.apiBaseUrl;

const emit = defineEmits(['refreshList']);

const isSubmitting = ref(false);

const successMessage = ref('');

const errorMessage = ref('');

const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
        form.logo = file;
    }
}

//creer les variables reactives 
const form = reactive({
    title: '',
    logo: '',
});

const fileInput = ref(null);

const submitForm = async () => {
    const formData = new FormData();
    formData.append('file', form.logo);

    isSubmitting.value = true;
    successMessage.value = '';
    errorMessage.value = '';

    try {
        const responseMediaObject = await $fetch(`${baseUrl}/api/media_objects`, {
            method: 'POST',
            headers: {
                Accept: 'application/ld+json',
            },
            body: formData
        })

        if (responseMediaObject) {
            try {
                const response = await $fetch(`${baseUrl}/api/technos`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/ld+json',
                        'Content-Type': 'application/ld+json'
                    },
                    body: {
                        title: form.title,
                        logo: responseMediaObject['@id']
                    }
                })

                successMessage.value = "Techno créée avec succès.";
                form.title = "";
                form.logo = "";

                if (fileInput.value) {
                    fileInput.value.value = '';
                }

                emit('refreshList');

            }
            catch (error) {
                errorMessage.value = "Une erreur est survenue lors de l'envoi de la ressource techno."
            }
        }
    }
    catch (error) {
        errorMessage.value = "Une erreur est survenue lors de l'envoi de la ressource logo."

    }
    finally {
        isSubmitting.value = false;
    }
}


</script>

<template>
    <form @submit.prevent="submitForm" class="flex flex-col bg-black gap-6 p-2 border border-blue-500/10 rounded-b-xl">
        <div class="flex flex-col gap-1">
            <label for="title" class="text-white">Nom</label>
            <input
                class="p-2 rounded-lg bg-black text-white border border-white/10 
                shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
                hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.50)]
                focus:outline-none focus:ring-2 focus:ring-blue-400/80 focus:border-blue-400/40 
                focus:shadow-[0_0_30px_-5px_rgba(59,130,246,0.75)]"
                type="text" id="title" placeholder="Ex: Vue.js" v-model="form.title">
        </div>

        <div class="flex items-center justify-center w-full">

            <label for="logo"
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/80 transition-all">

                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                
                    <svg class="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>

                    <p class="mb-2 text-sm text-gray-300">Cliquez pour uploader <span class="font-bold text-blue-500">le
                        logo</span></p>

                    
                    <p v-if="form.logo" class="text-green-400 font-bold mt-2">Sélectionné : {{ form.logo.name }}</p>
                </div>

                <input id="logo" ref="fileInput" type="file" class="hidden" @change="handleFileChange" />
            </label>
        </div>
        <div class="flex items-center justify-center">
            <UiTerminalText v-if="successMessage" :text=successMessage :speed="50" :size="20" :colorText="'text-green-300'"
                :colorCursor="'bg-green-300'" />
            <UiTerminalText v-if="errorMessage" :text=errorMessage :speed="50" :size="20" :colorText="'text-red-300'"
                :colorCursor="'bg-red-300'" />
        </div>

        <button type="submit" :disabled="isSubmitting" class="text-white border border-blue-500 p-3 
        rounded-xl bg-gray-950/70 
        shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
        focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out 
        border-white/10 focus:ring-blue-400/80 
        hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.75)]">Créer
        </button>
    </form>

</template>