    
    <script lang="ts">
        import CitySearch from "./CitySearch.svelte";
        import {signedInStore} from "../stores/stores";
        export let showSearch
        import {getContext, onMount} from "svelte";
        const chooseCityHandleClick = getContext('chooseCityHandleClick')
        const currentLocationHandleClick = getContext('currentLocationHandleClick')
        const showSignUp = getContext('showSignUp')
        const showSignIn = getContext('showSignIn')
        const showSavedEvents = getContext('showSavedEvents')
        const showProfile = getContext('showProfile')
        import {fade,scale} from "svelte/transition"
        import { quintOut } from "svelte/easing";
        let screenWidth
        let screenHeight
        onMount(()=>{
            screenWidth = window.innerWidth
            screenHeight = window.innerHeight
            window.addEventListener('resize',()=>{
                screenWidth = window.innerWidth
                screenHeight = window.innerHeight
            })
        })
        $: containerStyle = `width: ${screenWidth}px; height: ${screenHeight}px;`;
    </script>
    <div style={containerStyle}  class="container">
        <div class="header">
            <h1 class="logo">TerraSounds</h1>
            <div class="nav">
                {#if $signedInStore}
                    <a on:click ={showSavedEvents} href="/google.com">Saved Events</a>
                    <a on:click ={showProfile} href="/google.com">Profile</a>
                    {:else}
                    <a on:click ={showSignIn} href="/google.com">Login</a>
                    <a on:click ={showSignUp}  href="/google.com">Sign up</a>
                    {/if}
            </div>
        </div>
        
        <div class="hero">
            <span>
            <button id ='current' class="cta" on:click={currentLocationHandleClick} >Current Location</button>
            <button id ='choose' class="cta" on:click={chooseCityHandleClick} >Choose Location</button>
            {#if showSearch}
            <CitySearch></CitySearch>
            {/if}
            </span>
            <span></span>
            <div  class="earth">
                <img transition:scale = {{ delay: 250, duration: 300, easing: quintOut }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1024px-The_Earth_seen_from_Apollo_17.jpg" alt="Earth" />
            </div>
            <h2 class="title">Discover music events from around the world</h2>
        </div>
    </div>


<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ff69b4;
    }
    
    /*.header {*/
    /*    display: flex;*/
    /*    justify-content: space-around;*/
    /*    align-items: center;*/
    /*    width: 100%;*/
    /*    padding: 1rem;*/
    /*}*/

    .logo {
        position: absolute;
        top:0;
        left:10px;
        font-size: 2rem;
        font-weight: bold;
        color: darkblue;
    }

    .nav {
        position: absolute;
        top:10px;
        right:10px;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }

    .nav a {
        color: darkblue;
        font-size: 1.2rem;
        text-decoration: none;
        opacity: 0.7;
        transition: opacity 0.2s ease-in-out;
    }

    .nav a:hover {
        opacity: 1;
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
        margin-top: 3rem;
    }

    .earth {
        width: 300px;
        height: 300px;
        margin-bottom: 3rem;
        margin-top: 20px;
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
    
    .title {
        
        font-size: 3rem;
        font-weight: bold;
        color: darkblue;
    }

  

    .cta {
        
        font-size: 1.2rem;
        font-weight: bold;
        color: #fff;
        background-color: #ff69b4;
        border: none;
        border-radius: 4px;
        padding: 1rem 2rem;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
    }

    .cta:hover {
        background-color: blueviolet;
    }  
    
</style>