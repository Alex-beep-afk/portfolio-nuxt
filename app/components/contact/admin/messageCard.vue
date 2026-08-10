<script setup>

const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div class="shadow-lg p-4 rounded-md 
                flex flex-col items-center gap-4
                transition-all duration-300 ease-in-out 
                bg-[url('/medias/images/Metal.webp')]
                bg-center bg-cover bg-no-repeat
                text-white border border-blue-500/50 shadow-blue-500/50">

        <div class="flex items-center gap-4 w-full">
            <span
                class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm 
                border border-white/20 drop-shadow-[0_2px_5px_rgba(0,0,0,1)] text-center text-xl 
                flex items-center justify-center font-bold">{{
                    message.name[0].toUpperCase() }}</span>
            <div class="flex flex-col items-center ">
                <p class="font-bold text-lg drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">{{ message.name }}</p>
                

            </div>
        </div>

        <div class="flex flex-col gap-2">

            <p class="flex items-center gap-2 font-bold text-md drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor"
                        d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM12 12.116L4 6.885v10.5q0 .269.173.442t.443.173h14.769q.269 0 .442-.173t.173-.443v-10.5zM12 11l7.692-5H4.308zM4 6.885V6v11.385q0 .269.173.442t.443.173H4z" />
                </svg>
                {{ message.mail }}
            </p>

            <p class="flex items-center gap-2 font-bold text-md drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor"
                        d="M20 15.5c-1.2 0-2.5-.2-3.6-.6h-.3c-.3 0-.5.1-.7.3l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1c-.3-1.1-.5-2.4-.5-3.6c0-.5-.5-1-1-1H4c-.5 0-1 .5-1 1c0 9.4 7.6 17 17 17c.5 0 1-.5 1-1v-3.5c0-.5-.5-1-1-1M5 5h1.5c.1.9.3 1.8.5 2.6L5.8 8.8C5.4 7.6 5.1 6.3 5 5m14 14c-1.3-.1-2.6-.4-3.8-.8l1.2-1.2c.8.2 1.7.4 2.6.4z" />
                </svg>
                {{ message.phoneNumber }}
            </p>
            <p class="flex items-center gap-2 font-bold text-md drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="M12 7v5l3 3m6-3a9 9 0 1 1-18 0a9 9 0 0 1 18 0" />
                </svg>


                {{ formatDateTime(message.createdAt) }}
            </p>

            <p class="font-bold text-md drop-shadow-[0_2px_5px_rgba(0,0,0,1)] text-center"> {{ message.object }}</p>

            <p class="text-justify italic text-white/70"> {{ message.content }}</p>
        </div>

        <div class="flex gap-4 mt-2">


            <button class="text-blue-500/70 ">
                <svg class="w-5 h-5 drop-shadow-[0_2px_5px_rgba(248,51,51,1)]" xmlns="http://www.w3.org/2000/svg"
                    width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor"
                        d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
                </svg>

            </button>

            <button>
                <svg class="w-5 h-5 drop-shadow-[0_2px_5px_rgba(248,51,51,1)]" xmlns="http://www.w3.org/2000/svg"
                    width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="m18 9l-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0l.386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5" />
                </svg>
            </button>
        </div>
    </div>
</template>