import {goto} from "$app/navigation";
let isLocalStore
let cityStore

async function loadIsLocalStore() {
    const module = await import ('../../stores/stores')
    isLocalStore = module.isLocalStore
}

async function loadCityStore() {
    const module = await import ('../../stores/stores')
    cityStore = module.cityStore
}

export async function searchLocal() {
    await loadIsLocalStore()
    isLocalStore.set(true)
    setTimeout(() => goto("/map"), 0) // Ensures Map Page is fully rendered before
}

export async function searchNotLocal(input) {
    await loadIsLocalStore()
    await loadCityStore()
    isLocalStore.set(false)
    cityStore.set(input)
    setTimeout(() => goto("/map"), 0) // Ensures Map Page is fully rendered before
}