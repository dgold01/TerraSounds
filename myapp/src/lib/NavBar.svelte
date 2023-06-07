<!-- Your HTML code for the navbar -->
<script>
  import CitySearch from "$lib/CitySearch.svelte";
  import {getContext} from "svelte";
  import {signedInStore} from '../stores/stores'
    import {slide} from 'svelte/transition'
  const currentLocationHandleClick = getContext('currentLocationHandleClick')
  const showSignIn = getContext('showSignIn')
  const showSavedEvents = getContext('showSavedEvents')
  const showProfile = getContext('showProfile')
  import Switch from "$lib/Switch.svelte";
  import {isLightStore,searchLocal} from "../stores/stores";
  import Login from "$lib/Login.svelte";
  let showMenu = false;
  let showLogin = false;
  console.log($isLightStore)
  function handleMenu(){
    showMenu = !showMenu;
  }
  function handleShowLogin(){
    showLogin = !showLogin;
  }
</script>

<nav class="navbar">
    <div class = 'menuButton'>
        <button on:click ={handleMenu} class="hamburger-btn">
            <span class= {$isLightStore === 'dark' ? "line": "darkLine"}></span>
            <span class={$isLightStore === 'dark' ? "line": "darkLine"}></span>
            <span class={$isLightStore === 'dark' ? "line": "darkLine"}></span>
        </button>
        {#if showMenu}
            <div id="menu" transition:slide ="{{axis:'x'}}">
                <div class = 'logoContainer'>
                    <img class = 'logo' src = '../../src/avatas/logo.jpeg'>
                    <h1 class="text1">Terra</h1><h1 class="text2">Sounds</h1>
                </div>
                <button id="closeBtn" on:click={handleMenu}>&times;</button>
                <div class ='switch'>
                    <Switch bind:value={$isLightStore} label="Choose a theme" design="multi" options={['light', 'dark']} fontSize={15}/>
                    <button class = 'currentLocationButton' on:click={searchLocal}>Go to my current location</button>
                </div>
                
                <div class ='divider'></div>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Settings</a></li>
                </ul>
                <div class ='divider'></div>
                <ul class = 'menuItems'>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/profile">Friend activity</a></li>
                    <li><a href="/savedEvents">Your saved Events</a></li>
                    <li><a href="/savedEvents">Your timeline</a></li>
                </ul>
                <button on:click={handleShowLogin}>Login or sign up</button>
            </div>
        {/if}
    </div>
    <div class='searchContainer'>
        <CitySearch></CitySearch>
    </div>
    {#if showLogin}
    <Login {handleShowLogin}></Login>
    {/if}

</nav>
<!-- Your CSS styling for the navbar -->
<style>
    .menuItems{
        width: 150px;
    }
    .divider {
        width: 300px;
        height: 1px;
        background-color: gray;
        opacity: 30%;
    }
    .switch{
        padding: 20px;
        width:200px;
        
    }
    .navbar {
        position: absolute;
        z-index: 100;
    }
    .menuButton{
       position: absolute;
    }
    .logoContainer{
        background-color: white;
        height: 70px;
        width: 300px;
        display: flex;
    }
    .searchContainer {
        margin-left: 5vw;
        margin-top: 1vw;
    }
    .hamburger-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 5vw;
        height: 4.5vw;
        background: none;
        border: none;
        cursor: pointer;
    }
    .logo{
        margin-top: 5px;
        width :70px;
        padding-bottom: 5px;
    }
    .currentLocationButton{
        font-size: 15px;
        padding: 0;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        margin-top: 15px;
    
    }
    .text1 {
        padding-left: 10px;
        font-family: 'Bebas Neue', sans-serif;
        top: 12.5vw;
        left: 3vw;
        font-size: 30px;
        font-weight: bold;
        color: darkblue;
        letter-spacing: 4px;
    }
    .text2 {
        font-family: 'Roboto',sans-serif;
        padding-left: 1px;
       padding-bottom: 30px;
        font-size: 30px;
       
        color: darkgoldenrod;

    }
    .hamburger-btn .darkLine {
        width: 2.5vw;
        height: 0.2vw;
        background-color: black;
        margin-bottom: 0.4vw;
    }

    .hamburger-btn .line {
        width: 2.5vw;
        height: 0.2vw;
        background-color: white;
        margin-bottom: 0.4vw;
    }

    /* Styles for the lines of the hamburger icon */
    .hamburger-btn .line:last-child {
        margin-bottom: 0;
    }

    #menu {
        
        z-index: 200;
        position: absolute;
        top: 0;
        height: 100vh;
        width: 300px;
        background-color: #f3c2c2;
    }

    #menu ul {
        list-style: none;
        padding: 0;
        margin: 20px;
    }

    #menu ul li {
        margin-bottom: 10px;
    }

    #menu ul li a {
        color: black;
        text-decoration: none;
    }

    

    #closeBtn {
        position: absolute;
        top: 20px;
        right: 5px;
        color: black;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
    }
</style>
