<script setup>

const isMenuOpen = ref(false);

</script>

<template>
    <header class="fixed top-0 left-0 
        w-full flex flex-col items-center
        p-4 bg-black/25 backdrop-blur-md z-50 border-b border-slate-400/30 
        shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] lg:px-16 md:flex-row">

        <div class="flex justify-between items-center w-full">
            <NuxtLink to="/" class="flex items-center">
                <img src="/medias/images/logo.webp" alt="logo" class="h-16 lg:h-24 filter brightness-0 invert ">
                <p class="text-white text-2xl text-center hidden
                xl:text-left xl:text-4xl lg:block
                font-heading drop-shadow-[0_5px_5px_rgba(59,130,246,0.8)] 
                hover:text-blue-300 transition-colors duration-500 ease-in-out">Alexandre
                    Prigent</p>
            </NuxtLink>

            <svg v-if="!isMenuOpen" @click="isMenuOpen = !isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="1em"
                height="1em" viewBox="0 0 24 24"
                class="md:hidden text-white text-4xl cursor-pointer hover:text-blue-500 transition-all duration-500 ease-in-out">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="currentColor"
                    d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1" />
            </svg>
            <svg v-else @click="isMenuOpen = !isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                viewBox="0 0 16 16"
                class="md:hidden text-white text-4xl cursor-pointer hover:text-blue-500 transition-all duration-500 ease-in-out">
                <path d="M0 0h16v16H0z" fill="none" />
                <path fill="currentColor"
                    d="M12.293 2.293a1 1 0 0 1 1.414 1.414L9.414 8l4.293 4.293a1 1 0 1 1-1.414 1.414L8 9.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L6.586 8L2.293 3.707a1 1 0 1 1 1.414-1.414L8 6.586z" />
            </svg>
        </div>

        <nav :class="isMenuOpen ? 'max-h-72' : 'max-h-0'"
            class="overflow-hidden transition-all duration-500 ease-in-out 
                   md:max-h-none md:overflow-visible">

            <div class="flex flex-col items-center justify-center gap-16 py-4 text-white 
                        md:flex-row md:py-0 ">
                <UiAnimatedLink to="/projects">Projets</UiAnimatedLink>
                <UiAnimatedLink to="/about">About</UiAnimatedLink>
                <UiAnimatedLink to="/contact">Contact</UiAnimatedLink>
            </div>
        </nav>
    </header>
</template>