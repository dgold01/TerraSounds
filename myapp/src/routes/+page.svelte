<script lang="ts">
    import HomePage from "../lib/HomePage.svelte";
    let Login
    let CitySearch
    let showLogin = false;
    let showSearch = false;
    
    async function loadCitySearch(){
        const module = await import ('../lib/CitySearch.svelte')
        CitySearch = module.default
    }
    
    async function loadLogin(){
            const module = await import ('../lib/Login.svelte')
            Login = module.default
    }
    
    async function chooseCityHandleClick() {
        await loadCitySearch()
        showSearch = true
    }
    
    async function handleShowLogin() {
        await loadLogin()
        showLogin = !showLogin;
    }

</script>
<style>
    /*.map-container {*/
    /*    overflow: hidden;*/
    /*}*/
</style>


<HomePage {CitySearch} {showSearch} {handleShowLogin} {chooseCityHandleClick}></HomePage>
{#if showLogin}
   <Login {handleShowLogin}></Login>
{/if}