import {writable} from "svelte/store";


export const signedInStore = writable(false)

export const cityStore = writable('')

export const isLocalStore = writable(false)

export const eventsStore = writable([])

export const isLightStore = writable('dark')



