import {cityStore, isLocalStore} from "../stores/stores";
import {goto} from "$app/navigation";
import {setContext} from "svelte";

export const searchLocal = setContext('currentLocationHandleClick', currentLocationHandleClick)

setContext('searchCityHandleClick', searchCityHandleClick)


function currentLocationHandleClick() {
    isLocalStore.set(true)
    setTimeout(() => goto("/map"), 0) // Ensures Map Page is fully rendered before
}

function searchCityHandleClick(input) {
    isLocalStore.set(false)
    cityStore.set(input)
    setTimeout(() => goto("/map"), 0) // Ensures Map Page is fully rendered before
}