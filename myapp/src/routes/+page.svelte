<script lang="ts">
    import Homescreen from "../lib/Homescreen.svelte";
    import LoginPage from "../lib/LoginPage.svelte";
    import SignUpPage from "../lib/SignUpPage.svelte";
    import SavedEvents from "../lib/SavedEvents.svelte";
    import Profile from "../lib/Profile.svelte";
    import Map from "../lib/Map.svelte";
    import {getUsers} from "../lib/ApiServices/usersApiService";
    import {setContext} from 'svelte'
    let showSearch = false;
    let isLocal = true;
    let userId
    let showLoginPage
    let showSignUpPage
    let showSavedEventsPage
    let showProfilePage
    let showMapPage;
    let showHomePage = true;
    
    import {cityStore, signedInStore} from "../stores/stores";

    setContext('handleSignIn',handleSignIn)
    setContext('currentLocationHandleClick',currentLocationHandleClick)
    setContext('chooseCityHandleClick',chooseCityHandleClick)
    setContext('searchCityHandleClick',searchCityHandleClick)
    setContext('showSignUp',showSignUp)
    setContext('showSignIn',showSignIn)
    setContext('showSavedEvents',showSavedEvents)
    setContext('showProfile',showProfile)
    setContext('showMap',showMap)
    setContext('showHome',showHome)
    
    async function handleSignIn(email) {
        let users = []
        users = await getUsers()
        users.forEach((user)=>{
            if (user.email === email) userId = user._id
        })
        if(!userId) return console.log('no email found')
     
        $signedInStore = true
        showLoginPage = false;
        showSignUpPage = false;
        showHomePage = true
        
    }
    function showMap(){
        showMapPage = true;
        showHomePage = false;
        showLoginPage = false;
        showSavedEventsPage = false;
        showSignUpPage = false
        showProfilePage = false;
    }
    function showProfile(){
        showMapPage = false;
        showLoginPage = false;
        showSavedEventsPage = false;
        showSignUpPage = false
        showProfilePage = true
        showHomePage = false;
    }
    function showSignUp(){
        showHomePage = false;
        showProfilePage = false
        showMapPage = false;
        showLoginPage = false;
        showSavedEventsPage = false;
        showSignUpPage = true
        
    }
    function showHome(){
        showHomePage = true;
        showProfilePage = false
        showMapPage = false;
        showLoginPage = false;
        showSavedEventsPage = false;
        showSignUpPage = false;
    }
    function showSignIn(){
        showHomePage = false;
        showProfilePage = false
        showMapPage = false;
        showSignUpPage = false;
        showSavedEventsPage = false;
        showLoginPage = true
    }
    function showSavedEvents(){
        showHomePage = false;
        showProfilePage = false
        showMapPage = false;
        showSignUpPage = false;
        showLoginPage = false
        showSavedEventsPage =true
    }
    function currentLocationHandleClick() {
        console.log('test')
        isLocal = true
        showMap()
    }
    function chooseCityHandleClick(){
        showSearch = true
    }
    function searchCityHandleClick(input){
        isLocal = false;
        cityStore.set(input)
        showMap()
       
    }
    
</script>
{#if showMapPage}
   <Map  isLocal = {isLocal}></Map>
{:else if showSavedEventsPage}
    <SavedEvents></SavedEvents>
{:else if showLoginPage}
    <LoginPage ></LoginPage>
{:else if showSignUpPage}
    <SignUpPage  ></SignUpPage>
{:else if showProfilePage}
    <Profile></Profile>
{:else if showHomePage}
    <Homescreen {showLoginPage} {showSignUpPage} {showSearch} ></Homescreen>
{/if}


<!--<Map></Map>-->
