<script setup>
const route = useRoute();

const navLinks = [
    {
        label: 'Dashboard',
        path: '/admin/dashboard'
    },
    {
        label: 'Projets',
        path: "/admin/projets"
    },
    {
        label: 'Technos',
        path: "/admin/technos"
    },
    {
        label: 'Messages',
        path: "/admin/contact"
    }
]

const handleLogout = () => {
    const token = useCookie('auth_token');
    token.value = null;
    navigateTo('/');
}

</script>

<template>
    <aside class="flex flex-col justify-between p-4 bg-black/95 backdrop-blur-md border-b md:border-b-0 md:border-r border-blue-500/20 w-full md:w-56 lg:w-64 shrink-0 md:h-screen md:sticky md:top-0 gap-4 md:gap-6 z-40 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]">
        <!-- En-tête / Logo & Liens de navigation -->
        <div class="flex flex-col gap-4">
            <!-- Header du panel -->
            <div class="flex items-center justify-between pb-3 border-b border-blue-500/20">
                <div class="flex items-center gap-2.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></div>
                    <span class="text-white font-bold tracking-wider text-sm md:text-base">ADMIN</span>
                </div>
                <!-- Actions mobiles visibles seulement en petit écran -->
                <div class="flex md:hidden items-center gap-2">
                    <NuxtLink to="/" title="Retour au site" class="flex items-center justify-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all duration-200">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </NuxtLink>
                    <button @click="handleLogout()" title="Déconnexion" class="flex items-center justify-center p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/60 transition-all duration-200 cursor-pointer">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Liens de navigation : horizontal sur mobile, vertical sur desktop -->
            <nav class="flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto pb-1 md:pb-0">
                <UiAdminNavLink v-for='link in navLinks' :key='link.label' :label='link.label' :path='link.path'
                    :isActive='route.path === link.path' class="shrink-0 md:shrink" />
            </nav>
        </div>

        <!-- Actions desktop en bas de l'aside -->
        <div class="hidden md:flex flex-col gap-3 pt-4 border-t border-blue-500/20">
            <NuxtLink to="/" class="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/60 hover:shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)] transition-all duration-200 text-sm font-medium">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Voir le site</span>
            </NuxtLink>

            <button @click="handleLogout()" class="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/60 hover:shadow-[0_0_15px_-3px_rgba(244,63,94,0.4)] transition-all duration-200 text-sm font-medium cursor-pointer">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Déconnexion</span>
            </button>
        </div>
    </aside>
</template>