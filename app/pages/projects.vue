<script setup>
const config = useRuntimeConfig()

// Appel Api pour les projets
const { projects, fetchProjects } = useProjects();
await fetchProjects();
</script>

<template>
    <main class="relative min-h-screen">
        <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover -z-10 ">
            <source :src="'/medias/BackgroundFolio.mp4'" type="video/mp4">
        </video>
        <section class="pt-32 pb-8 px-8 lg:mt-8 lg:px-16 ">
            <SectionGridProjects :projects="projects" />
        </section>
    </main>
</template>