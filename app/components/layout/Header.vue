<template>

    <header
        class="sticky top-0 left-0 right-0 
        w-full flex justify-between items-center 
        px-8 lg:px-16 bg-black z-50 h-24 border-b border-slate-400/30 
        shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]">
        <NuxtLink to="/" class="flex items-center">
            <img src="/medias/images/logo.png" alt="logo" class="h-24 filter brightness-0 invert">
            <p class="text-white font-bold text-3xl font-heading">Alexandre Prigent</p>
        </NuxtLink>

        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
            class="md:hidden text-white text-4xl cursor-pointer hover:text-blue-500 transition-all duration-500 ease-in-out">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor"
                d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1" />
        </svg>

        <nav class="text-white gap-16 hidden md:flex">
            <UiAnimatedLink to="/projects">Projets</UiAnimatedLink>
            <UiAnimatedLink to="#">A propos</UiAnimatedLink>
            <UiAnimatedLink to="/contact">Contact</UiAnimatedLink>
        </nav>
    </header>
</template>