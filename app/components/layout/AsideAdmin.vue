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

</script>

<template>
    <aside class="flex flex-col justify-between p-4 bg-slate-600 h-full w-1/3 gap-4 min-h-screen sticky top-0">
        <div class="flex flex-col gap-4">
            <UiAdminNavLink v-for='link in navLinks' :key='link.label' :label='link.label' :path='link.path'
                :isActive='route.path === link.path' />
        </div>
        <div class="flex flex-col gap-4">
            <NuxtLink to="/" class="flex justify-center items-center gap-2 bg-green-500/30 p-2 rounded text-green-500/50 
                hover:cursor-pointer hover:bg-green-500/50 hover:text-green-500 
                transition-colors duration-300 ease-in-out ">

                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor"
                        d="M6 19h3.692v-5.884h4.616V19H18v-9l-6-4.538L6 10zm-1 1V9.5l7-5.288L19 9.5V20h-5.692v-5.884h-2.616V20zm7-7.77" />
                </svg>
            </NuxtLink>
            <NuxtLink to="/" class="flex justify-center items-center gap-2 
                bg-red-500/30 p-2 rounded text-red-500/50
                hover:cursor-pointer hover:bg-red-500/50 hover:text-red-500 
                transition-colors duration-300 ease-in-out ">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor"
                        d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" />
                </svg>

            </NuxtLink>

        </div>
    </aside>

</template>