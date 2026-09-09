<script setup>
const config = useRuntimeConfig();
const props = defineProps({
    tech: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div
        class="group relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-center gap-4 cursor-pointer select-none transition-all duration-500 ease-out
        border-2 border-blue-500/60 hover:border-blue-400
        shadow-[0_0_25px_-3px_rgba(59,130,246,0.30),inset_0_0_20px_rgba(59,130,246,0.15)]
        hover:shadow-[0_0_40px_rgba(59,130,246,0.60),inset_0_0_25px_rgba(59,130,246,0.25)]
        hover:-translate-y-1.5"
    >
        <div
            class="absolute inset-0 bg-[url('/medias/images/bg-tech.png')] bg-cover bg-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out z-0"
        ></div>

       
        <div
            class="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950/90 z-0"
        ></div>

        
        <div class="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.9)] z-10"></div>
        <div class="absolute bottom-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.9)] z-10"></div>

        
        <div class="absolute top-3 right-3.5 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity z-10">
            <span class="w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
            <span class="w-1 h-1 rounded-full bg-blue-400/60"></span>
            <span class="w-1 h-1 rounded-full bg-blue-400/40"></span>
        </div>
        <div class="absolute top-3 left-3.5 flex flex-col gap-0.5 opacity-50 group-hover:opacity-90 transition-opacity z-10">
            <span class="w-3.5 h-[1.5px] bg-blue-400 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
            <span class="w-2 h-[1.5px] bg-blue-400/50"></span>
        </div>

        
        <div class="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 z-10">
            
            <div
                class="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500/20 blur-xl group-hover:bg-blue-400/35 group-hover:scale-125 transition-all duration-500"
            ></div>

            
            <img
                :src="tech.logo?.contentUrl ? `${config.public.apiBaseUrl}${tech.logo.contentUrl}` : '/medias/images/bg-default.png'"
                :alt="tech.title"
                class="relative w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] group-hover:scale-110 group-hover:drop-shadow-[0_0_18px_rgba(59,130,246,0.9)] transition-all duration-300 z-10"
            />
        </div>

      
        <h3
            class="relative text-blue-300 font-bold text-base sm:text-lg tracking-wider uppercase text-center drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] group-hover:text-white group-hover:drop-shadow-[0_0_14px_rgba(59,130,246,1)] transition-all duration-300 z-10"
        >
            {{ tech.title }}
        </h3>
    </div>
</template>