<script setup>

const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiBaseUrl;

definePageMeta({
    layout: 'admin'
})

const { data: messagesData, refresh } = await useFetch(`${baseUrl}/api/message_contacts`, {
    headers: {
        accept: 'application/ld+json'
    },
    server: false
});

const displayMessages = computed(() => {
    return messagesData.value ? messagesData.value.member : [];
})

</script>

<template>
    <section class="flex flex-col gap-4">
        <h1 class="text-blue-500/70 font-bold text-2xl text-center drop-shadow-[0_5px_5px_rgba(59,130,246,1)]">Gestion
            des messages</h1>

        <div v-if="displayMessages.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactAdminMessageCard v-for="message in displayMessages" :key="message.id" :message="message" />
        </div>
        <div v-else>
            <p class="text-center text-gray-500">Aucun message pour le moment.</p>
        </div>

        
    </section>
</template>