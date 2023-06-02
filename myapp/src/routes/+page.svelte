<script lang="ts">
    import HomePage from "../lib/HomePage.svelte";
    import {goto} from '$app/navigation';
    import {getUsers} from "../lib/ApiServices/usersApiService";
    import {setContext} from 'svelte'

    let showSearch = false;

    // let userId


    import {cityStore, isLocalStore, signedInStore} from "../stores/stores";

    // setContext('handleSignIn',handleSignIn)
    setContext('currentLocationHandleClick', currentLocationHandleClick)
    setContext('chooseCityHandleClick', chooseCityHandleClick)
    setContext('searchCityHandleClick', searchCityHandleClick)
    // setContext('showSignUp',showSignUp)
    // setContext('showSignIn',showSignIn)
   

    // async function handleSignIn(email) {
    //     let users = []
    //     users = await getUsers()
    //     users.forEach((user)=>{
    //         if (user.email === email) userId = user._id
    //     })
    //     if(!userId) return console.log('no email found')
    // 
    //     $signedInStore = true
    //     showLoginPage = false;
    //     showSignUpPage = false;
    //     showHomePage = true
    //    
    // }
    function currentLocationHandleClick() {
        isLocalStore.set(true)
        setTimeout(() => goto("/map"), 0) // Ensures Map Page is fully rendered before
    }
    function chooseCityHandleClick() {
        showSearch = true
    }
    function searchCityHandleClick(input) {
        isLocalStore.set(false)
        cityStore.set(input)
        setTimeout(() => goto("/map"), 0) // Ensures Map Page is fully rendered before
    }
</script>
<style>
    /*.map-container {*/
    /*    overflow: hidden;*/
    /*}*/
</style>

<!--{if showLoginPage}-->
<!--    <LoginPage ></LoginPage>-->
<!--{:else if showSignUpPage}-->
<!--    <SignUpPage  ></SignUpPage>-->


<HomePage {showSearch}></HomePage>
