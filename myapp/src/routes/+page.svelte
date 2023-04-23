<script lang="ts">
    import Homescreen from "../lib/Homescreen.svelte";
    import Map from "../lib/Map.svelte";
    import {onMount} from "svelte";
    import {getUsers} from "../lib/ApiServices/usersApiService";
    import {setContext} from 'svelte'
    let city = ''
    let showMap = false;
    let showSearch = false;
    let isLocal = true;
    let signedIn;
    let userId
    
    
    
    async function handleSignIn(email) {
        let users = []
        users = await getUsers()
        users.forEach((user)=>{
            if (user.email === email) userId = user._id
        })
        console.log(userId)
        signedIn = true
    }
    
    setContext('signedIn',signedIn)
    setContext('handleSignIn',handleSignIn)
    // function handleSignIn(){
    //     // showLoginPage = false;
    //     // showSignUpPage = false;
    // }
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
        console.log(city)
        $: console.log(city)
    }
    
    onMount(() => {
        document.getElementById('current').addEventListener('click', handleClick);
        document.getElementById('choose').addEventListener('click', handleSearch);
    });
</script>
{#if showMap}
   <Map handleSearchClick = {handleSearchClick} chosenCity = {city}  isLocal = {isLocal}></Map>
{:else}
    <Homescreen handleSearchClick = {handleSearchClick}   showSearch ={showSearch} handleClick = {handleClick}></Homescreen>
{/if}

<!--<Map></Map>-->
