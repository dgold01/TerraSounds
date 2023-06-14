<script lang="ts">
    import HomePage from "../lib/HomePage.svelte";
    import NavBar from "../lib/NavBar.svelte";
    let CitySearch
    let showSearch = false;
    
    async function loadCitySearch(){
        const module = await import ('../lib/CitySearch.svelte')
        CitySearch = module.default
    }
    
   
    
    async function chooseCityHandleClick() {
        await loadCitySearch()
        showSearch = true
    }
    

</script>
<style>
    /*.map-container {*/
    /*    overflow: hidden;*/
    /*}*/
</style>


<NavBar></NavBar>
<HomePage {CitySearch} {showSearch} {chooseCityHandleClick}></HomePage>
