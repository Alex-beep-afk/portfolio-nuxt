<template>
    <div class="flex flex-col md:flex-row min-h-screen bg-black">
        <LayoutAsideAdmin />
        <main class="min-h-screen bg-slate-900/80 flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
            <slot />
        </main>
    </div>
</template>