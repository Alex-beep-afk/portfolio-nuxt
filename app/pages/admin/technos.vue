<script setup>

definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const config = useRuntimeConfig();


const { data: techData, refresh } = await useFetch(`${config.public.apiBaseUrl}/api/technos`, {
    server: false,
    headers: {
        Accept: 'application/ld+json'
    }
});

const technos = computed(() => {
    return techData.value ? techData.value.member : [];
});

</script>

<template>
    <div class="flex flex-col gap-8">
        <h1 class="text-blue-500/70 font-bold text-2xl text-center drop-shadow-[0_5px_5px_rgba(59,130,246,1)]">Gestion des techno</h1>
        
        <section class="bg-blue-500/10 rounded-xl shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]">
            <h2 class="p-2 bg-blue-500/20 rounded-t-xl text-blue-500/70 font-bold">Créer une nouvelle techno</h2>
            <TechAdminTechForm @refresh-list="refresh" />
        </section>

        <section>
            <h2 class="text-blue-500/70 font-bold text-xl drop-shadow-[0_5px_5px_rgba(59,130,246,0.7)] mb-4">Technos enregistrées</h2>
            
            <div v-if="technos.length === 0">
                <p>Aucune techno enregistrée</p>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <TechAdminTechCard v-for="tech in technos" :key="tech.id" :tech="tech" @refresh-list="refresh" />
            </div>
        </section>


    </div>
</template>