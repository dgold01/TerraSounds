<script lang="ts">
    import Homescreen from "../lib/Homescreen.svelte";
    import Map from "../lib/Map.svelte";
    import {onMount} from "svelte";
    let showMap = false;
    function handleClick() {
        showMap = true
    }
    onMount(() => {
        document.querySelector('button').addEventListener('click', handleClick);
    });
</script>
{#if showMap}
   <Map></Map>
    {:else}
    <Homescreen handleClick = {handleClick}></Homescreen>
{/if}

<!--<Map></Map>-->
