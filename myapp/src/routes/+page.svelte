<script lang="ts">
    import Homescreen from "../lib/Homescreen.svelte";
    import Map from "../lib/Map.svelte";
    import {onMount} from "svelte";
    import CitySearch from "../lib/CitySearch.svelte";
    
    let city = ''
    let showMap = false;
    let showSearch = false;
    let isLocal = true;
    function handleClick() {
        isLocal = true
        showMap = true
    }
    function handleSearch(){
        showSearch = true
        console.log('test')
    }
    function handleSearchClick(input){
        city = input
        isLocal = false
        showMap = true
        console.log(input)
    }
    onMount(() => {
        document.getElementById('current').addEventListener('click', handleClick);
        document.getElementById('choose').addEventListener('click', handleSearch);
    });
</script>
{#if showMap}
   <Map chosenCity = {city}  isLocal = {isLocal}></Map>
{:else}
    <Homescreen handleSearchClick = {handleSearchClick}   showSearch ={showSearch} handleClick = {handleClick}></Homescreen>
{/if}

<!--<Map></Map>-->
