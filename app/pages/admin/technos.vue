<script setup>
definePageMeta({
    layout: 'admin'
});
const config = useRuntimeConfig();


const { data: techData } = await useFetch(`${config.public.apiBaseUrl}/api/technos`, {
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
    <div class ="flex flex-col gap-8">
        <h1>Gestion des techno</h1>
        <section>
        <h2>Technos enregistrées</h2>
            <div v-if="technos.length === 0">
                <p>Aucune techno enregistrée</p>
            </div>
            <div v-else class="flex gap-4 flex-wrap">
                <div v-for="tech in technos" :key="tech.id">
                    <TechAdminTechCard :tech="tech" />
                </div>
            </div>
        </section>
        <section>
            <h2>Créer une nouvelle techno</h2>
            <TechAdminTechForm />
        </section>
        
        
    </div>
</template>