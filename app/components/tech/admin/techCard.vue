<script setup>

const config = useRuntimeConfig();

const props = defineProps({
    tech: {
        type: Object,
        required: true
    }
});

const isActive = ref(props.tech.active);


const deleteTech = (id) => {
    const token = useCookie('auth_token');
    const isConfirmed = confirm("Etes-vous sur de vouloir supprimer cette techno ?");

    if (!isConfirmed) {
        return;
    }

    $fetch(`${config.public.apiBaseUrl}/api/technos/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/ld+json',
            Authorization: `Bearer ${token.value}`
        }
    })
}



const toggleActive = async(id) => {
    const newValue = !isActive.value;

    try {
        const response = await $fetch(`${config.public.apiBaseUrl}/api/technos/${id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/ld+json',
                'Content-Type': 'application/merge-patch+json'
            },
            body: {
                active: newValue
            }
        });
        isActive.value = newValue;
    }
    catch(error){
        console.error(error);
    }
}

</script>

<template>
    <div class="border p-2 rounded-md shadow-md flex flex-col items-center transition-colors duration-300 ease-in-out"
        :class="isActive ? 'bg-green-500' : 'bg-red-500'">
        <img class="w-16 h-16"
            :src="tech.logo ? `${config.public.apiBaseUrl}${tech.logo.contentUrl}` : '/medias/images/bg-default.png'"
            alt="">
        <p>{{ tech.title }}</p>
        <button @click="deleteTech(tech.id)">Supprimer</button>

        <input type="checkbox" :checked="isActive" @change="toggleActive(tech.id)">Activer</input>
    </div>
</template>