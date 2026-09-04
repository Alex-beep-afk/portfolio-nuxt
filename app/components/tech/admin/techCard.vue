<script setup>

const config = useRuntimeConfig();

const token = useCookie('auth_token');

const emit = defineEmits(['refreshList']);

const props = defineProps({
    tech: {
        type: Object,
        required: true
    }
});

const isActive = ref(props.tech.active);


const deleteTech = async (id) => {
    const token = useCookie('auth_token');
    const isConfirmed = confirm("Etes-vous sur de vouloir supprimer cette techno ?");

    if (!isConfirmed) {
        return;
    }

    try {
        const response = await $fetch(`${config.public.apiBaseUrl}/api/technos/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/ld+json',
                Authorization: `Bearer ${token.value}`
            }
        })
        emit('refreshList');
    }
    catch (error) {
        console.error(error);
    }
}



const toggleActive = async (id) => {
    const newValue = !isActive.value;

    try {
        const response = await $fetch(`${config.public.apiBaseUrl}/api/technos/${id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/ld+json',
                'Content-Type': 'application/merge-patch+json',
                Authorization: `Bearer ${token.value}`
            },
            body: {
                active: newValue
            }
        });
        isActive.value = newValue;
    }
    catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <div class="shadow-lg p-4 rounded-md 
                flex flex-col items-center gap-4
                transition-all duration-300 ease-in-out"
        :class="isActive ? 'shadow-green-500/50 border border-green-500' : 'shadow-red-500/50 border border-red-500'">
        <img class="w-16 h-16"
            :src="tech.logo ? `${config.public.apiBaseUrl}${tech.logo.contentUrl}` : '/medias/images/bg-default.png'"
            alt="">
        <p class="font-bold text-blue-500">{{ tech.title }}</p>

        <div class="flex flex-col items-center gap-4">
            <label class="relative inline-flex items-center cursor-pointer">

                <input type="checkbox" class="sr-only peer" :checked="isActive" @change="toggleActive(tech.id)">

                <div class="w-11 h-6 bg-red-500 rounded-full transition-colors 
                peer-checked:bg-green-500 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all peer-checked:after:translate-x-full">
                </div>

                <span class="ml-3 text-sm font-medium" :class="isActive ? 'text-green-500' : 'text-red-500'">{{ isActive
                    ? 'Active' : 'Non activée' }}</span>
            </label>

            <button @click="deleteTech(tech.id)" class="shadow-md shadow-red-500/50 text-red-500 
                font-bold flex gap-1 items-center border border-red-500 px-4 py-2 rounded 
                hover:cursor-pointer hover:bg-red-500/50 hover:text-red-100 transition-colors duration-300 ease-in-out">
                <svg class="w-5 h-5 drop-shadow-[0_2px_5px_rgba(248,51,51,1)]" xmlns="http://www.w3.org/2000/svg" width="1em"
                    height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="m18 9l-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0l.386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5" />
                </svg>
                Supprimer
            </button>


        </div>
    </div>
</template>