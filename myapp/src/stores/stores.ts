import {writable} from "svelte/store";
import {goto} from "$app/navigation";

export const signedInStore = writable(false)

export const cityStore = writable('')

export const isLocalStore = writable(false)

export const eventsStore = writable([])
    
export const isLightStore = writable('dark')

export const searchLocal = function () {
    isLocalStore.set(true)
    setTimeout(() => goto("/map"), 0) // Ensures Map Page is fully rendered before
}

export const searchNotLocal = function (input) {
    isLocalStore.set(false)
    cityStore.set(input)
    setTimeout(() => goto("/map"), 0) // Ensures Map Page is fully rendered before
}