<script lang="ts">

    import CitySearch from "./CitySearch.svelte";
    import {signedInStore,searchLocal} from "../stores/stores";

    export let showSearch
    export let chooseCityHandleClick
    import {getContext, onMount} from "svelte";
    
    const currentLocationHandleClick = getContext('currentLocationHandleClick')
    const showSignUp = getContext('showSignUp')
    const showSignIn = getContext('showSignIn')

    let screenWidth
    let screenHeight
    onMount(() => {
        screenWidth = window.innerWidth
        screenHeight = window.innerHeight
        window.addEventListener('resize', () => {
            screenWidth = window.innerWidth
            screenHeight = window.innerHeight
        })
    })
    $: containerStyle = `width: ${screenWidth}px; height: ${screenHeight}px;`;
</script>
<div style={containerStyle} class="container">
    <div class="header">
        <h1 class="logo1"  >Terra</h1>
        <h1 class="logo2"  >S</h1>
        <h1 class="logo3"  >unds</h1>
        <div class="nav">
            {#if $signedInStore}
                <a href="/SavedEvents">Saved Events</a>
                <a href="/Profile">Profile</a>
            {:else}
                <a class="button-link" href="/LogIn">Login</a>
                <a class="button-link" href="/SignIn">Sign up</a>
            {/if}
        </div>
    </div>

    <div class="hero">
            <span>
            <button id='current' class="cta" on:click={searchLocal}>Current Location</button>
            <button id='choose' class="cta" on:click={chooseCityHandleClick}>Choose Location</button>
                {#if showSearch}
                <div class ='searchContainer'>
                      <CitySearch></CitySearch>
                </div>
            {/if}
            </span>
        <span></span>
        <div class="earth">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1024px-The_Earth_seen_from_Apollo_17.jpg"
                 alt="Earth"/>
        </div>
        
    </div>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f3c2c2;
    }
    .searchContainer{
        position: absolute;
        left:43%;
    }
    /*.header {*/
    /*    display: flex;*/
    /*    justify-content: space-around;*/
    /*    align-items: center;*/
    /*    width: 100%;*/
    /*    padding: 1rem;*/
    /*}*/
    .logoImage{
        position: absolute;
        top:0;
        left: 0;
    }
    .logo1 {
        position: absolute;
        font-family: 'Bebas Neue', sans-serif;
        top: 12.5vw;
        left: 3vw;
        font-size: 11.2vw;
        font-weight: bold;
        color: darkblue;
        letter-spacing: 5vw;
    }
    .logo2 {
        position: absolute;
        top: 12.5vw;
        font-size: 11.2vw;
        font-weight: bold;
        color: darkgoldenrod;
    
    }
    .logo3 {
        position: absolute;
        margin-left:  70vw;
        top: 12.5vw;
        left: 0.5vw;
        font-size: 11.2vw;
        font-weight: bold;
        color: darkgoldenrod;
        letter-spacing: 1vw;

    }
    .button-link {
        z-index: 100;
        display: inline-block;
        padding: 3px 12px;
        background-color: white;
        color: black;
        border: none;
        border-radius: 2vw;
        text-decoration: none;
        
    }


    .nav {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }

    .nav a {
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
    }

    .nav a:hover {
        opacity: 0.8;
    }

    .nav a.active {
        opacity: 1;
        font-weight: bold;
    }

    .hero {

        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: 25rem;
    }

    .earth {
        margin-left: 26vw;
        width: 13vw;
        position: absolute;
        top: 18vw;
        animation: spin 10s linear infinite;
    }

    .earth img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0px 0px 50px 10px #1e90ff;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }


    .cta {
        font-size: 1.2rem;
        font-weight: bold;
        color: #fff;
        background-color:#f3c2c2;
        border: none;
        border-radius: 4px;
        padding: 1rem 2rem;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
    }

    

</style>