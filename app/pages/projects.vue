<script setup>
const config = useRuntimeConfig()

// Appel Api pour les projets
const { projects, fetchProjects } = useProjects();
await fetchProjects();
</script>

<template>
    <main class="relative">
        <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover -z-10 ">

            <source src="/medias/backgroundFolio.mp4" type="video/mp4">
        </video>
        <section class="px-8 py-16 lg:p-16">
            <SectionGridProjects :projects="projects" />
        </section>
    </main>
</template>