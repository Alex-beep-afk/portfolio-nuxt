<script setup>

const config = useRuntimeConfig();
const baseUrl = config.public.apiBaseUrl;

const isSubmitting = ref(false);

const successMessage = ref('');

const errorMessage = ref('');

const handleFileChange = (event) => {
    const file = event.target.files[0];

    if(file) {
        form.logo = file;
    }
}

//creer les variables reactives 
const form = reactive({
    title: '',
    logo: '',
})

const submitForm = async () => {
    const formData = new FormData();
    formData.append('file', form.logo);
    
    isSubmitting.value = true ;
    successMessage.value = '' ;
    errorMessage.value = '' ;

    try{
        const responseMediaObject = await $fetch(`${baseUrl}/api/media_objects`,{
            method: 'POST',
            headers:{
                Accept: 'application/ld+json',
            },
            body: formData
        })

        if(responseMediaObject){
            try {
                const response = await $fetch(`${baseUrl}/api/technos`,{
                    method: 'POST',
                    headers:{
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
            }
            catch (error){
                errorMessage.value = "Une erreur est survenue lors de l'envoi de la ressource techno."   
            }
        }
    }
    catch (error){
        errorMessage.value = "Une erreur est survenue lors de l'envoi de la ressource logo."
       
    }
    finally {
        isSubmitting.value = false;
    }
}


// A la soumission du formulaire soumettre un premier appel API pour la creation de la ressource media object
// si la ressource à bien été crée on recupere l'id du media object
// on fait un deuxieme appel api pour créer la techno et on envoi l'id du media object pour etablir la relation
</script>

<template>
    <form @submit.prevent="submitForm" class="flex flex-col gap-2 p-2">
        <label for="title">Nom</label>
        <input type="text" id="title" v-model="form.title">

        <label for="logo">Logo</label>
        <input type="file" @change="handleFileChange" id="logo" >

        <button type="submit" :disabled="isSubmitting" class="text-white mt-12 border border-blue-500 p-3 rounded-xl bg-gray-950/70 shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
                        focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out 
                        border-white/10 focus:ring-blue-400/80 
                        hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]">Créer</button>
    </form>

    <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
</template>