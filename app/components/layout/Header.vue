<script setup>

const isMenuOpen = ref(false);
const headerRef = ref(null) ;
onClickOutside(headerRef, () => {
    isMenuOpen.value = false
})

useEventListener('scroll', () => {
    if (isMenuOpen.value) {
        isMenuOpen.value = false
    }
}, { passive: true });
</script>

<template>
    <header ref="headerRef" class="fixed top-0 left-0 w-full z-50
        flex flex-col md:flex-row md:items-center md:justify-between
        py-2 px-4 bg-black/60 backdrop-blur-md border-b border-slate-400/30 
        shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] lg:px-16 mx-auto transition-all duration-500 ease-in-out">

        
        <div class="flex items-center justify-between w-full md:w-auto">
            <NuxtLink to="/" class="flex items-center">
                <img src="/medias/images/logo.webp" alt="Alexandre Prigent - Retour à l'acceuil"
                    class="h-14 filter brightness-0 invert focus-visible:ring-2">
                <p class="text-white text-2xl text-center hidden
                    xl:text-left lg:block
                    font-heading hover:drop-shadow-[0_5px_5px_rgba(59,130,246,0.8)] 
                    hover:text-blue-100 transition-all duration-500 ease-in-out">
                    Alexandre Prigent
                </p>
            </NuxtLink>

            <button type="button" aria-label="Toggle menu" class="md:hidden flex items-center justify-center focus:outline-none" @click="isMenuOpen = !isMenuOpen">
                <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="1em"
                    height="1em" viewBox="0 0 24 24"
                    class="text-white text-4xl cursor-pointer hover:text-blue-500 transition-all duration-500 ease-in-out">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor"
                        d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                    viewBox="0 0 16 16"
                    class="text-white text-4xl cursor-pointer hover:text-blue-500 transition-all duration-500 ease-in-out">
                    <path d="M0 0h16v16H0z" fill="none" />
                    <path fill="currentColor"
                        d="M12.293 2.293a1 1 0 0 1 1.414 1.414L9.414 8l4.293 4.293a1 1 0 1 1-1.414 1.414L8 9.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L6.586 8L2.293 3.707a1 1 0 1 1 1.414-1.414L8 6.586z" />
                </svg>
            </button>
        </div>

        
        <nav :class="isMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'" 
            class="overflow-hidden transition-all duration-500 ease-in-out w-full
                   md:static md:w-auto md:max-h-none md:overflow-visible md:opacity-100 md:pointer-events-auto">

            <div class="flex flex-col items-center justify-center gap-8 py-6 text-white 
                        md:flex-row md:gap-16 md:py-0">
                <UiAnimatedLink to="/projects" @click="isMenuOpen = false">Projets</UiAnimatedLink>
                <UiAnimatedLink to="/about" @click="isMenuOpen = false">About</UiAnimatedLink>
                <UiAnimatedLink to="/contact" @click="isMenuOpen = false">Contact</UiAnimatedLink>
            </div>
        </nav>
    </header>
</template>