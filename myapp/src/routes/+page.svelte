<script lang="ts">
    import Homescreen from "../lib/Homescreen.svelte";
    import Map from "../lib/Map.svelte";
    import {onMount} from "svelte";
    import {getUsers} from "../lib/ApiServices/usersApiService";
    import {setContext} from 'svelte'
    let showMap = false;
    let showSearch = false;
    let isLocal = true;
    let userId
    let showLoginPage
    let showSignUpPage

    import {cityStore, signedInStore} from "../stores/stores";
  
    async function handleSignIn(email) {
        
        let users = []
        users = await getUsers()
        users.forEach((user)=>{
            if (user.email === email) userId = user._id
        })
        $signedInStore = true
        showLoginPage = false;
        showSignUpPage = false;
    }
    
    
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
        isLocal = false;
        cityStore.set(input)
        showMap = true
        console.log($cityStore)
    }
    
    onMount(() => {
        document.getElementById('current').addEventListener('click', handleClick);
        document.getElementById('choose').addEventListener('click', handleSearch);
    });
</script>
{#if showMap}
   <Map handleSearchClick = {handleSearchClick}   isLocal = {isLocal}></Map>
{:else}
    <Homescreen showLoginPage= {showLoginPage} showSignUpPage={showSignUpPage} handleSearchClick = {handleSearchClick}   showSearch ={showSearch} handleClick = {handleClick}></Homescreen>
{/if}

<!--<Map></Map>-->
