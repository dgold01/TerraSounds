import {writable} from "svelte/store";

export const signedInStore = writable(false)

export const cityStore = writable('')

export const eventsStore = writable([])
    
export const isLightStore = writable(false)