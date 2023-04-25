<!-- Your HTML code for the navbar -->
<script>
  import CitySearch from "$lib/CitySearch.svelte";
  import {getContext} from "svelte";
  import {signedInStore} from '../stores/stores'
  const currentLocationHandleClick = getContext('currentLocationHandleClick')
  const showSignIn = getContext('showSignIn')
  const showSavedEvents = getContext('showSavedEvents')
  const showProfile = getContext('showProfile')
  import Switch from "$lib/Switch.svelte";
  import {isLightStore} from "../stores/stores";
  
</script>

<nav class="navbar">
    <div class="navbar-expand">
        <div class="switch">
        <Switch bind:value={$isLightStore} label="Choose a theme" design="multi" options={[true, false]} fontSize={12}/>
        </div>
        <div class ='searchContainer'>
            <h1>Selected a different city</h1>
            <CitySearch  class="citySearch"></CitySearch>
        </div>
        <button id ='current' class="cta" on:click={currentLocationHandleClick}>Get events for current location</button>
        {#if $signedInStore}
        <button on:click={showProfile} >Profile</button>
        <button on:click={showSavedEvents}>Saved events</button>
        {:else}
            <button on:click={showSignIn}>Sign in to see saved events</button>
        {/if}
        
    </div>
    
</nav>
<!-- Your CSS styling for the navbar -->
<style>
    .switch {
        margin-right: 250px;
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        margin-bottom: 0;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    
    .navbar {
        margin: -8px;
        background-color: #ff69b4;
        color: #fff;
        display: flex;
        justify-content: center;
        padding: 0.5rem;
        height: 10px;
        position: relative;
    }
    .navbar-button{
        align-self: center;
        background: none;
        border: none;
        cursor: pointer;
        height: 30px;
        width: 30px;
    }
    .navbar:hover {
        opacity: 1;
        height: 100px;
        transition: height 0.3s ease-in-out;
    }
 
 

    .navbar-button-icon {
        background-color: #fff;
       
        width: 100%;
    }

    .navbar-button-icon::before {
        top: -8px;
    }

    .navbar-button-icon::after {
        top: 8px;
    }

    .navbar-expand {
        
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        left: 20px;
        right: 0;
        height: 0;
        overflow: hidden;
        /*transition: height 0.3s ease-in-out;*/
    }

    .citySearch {
        display: flex;
        flex-direction: row;
        
        visibility: hidden;
    }

    .navbar:hover .navbar-expand {
        height: 100px;
    }

    .navbar:hover .citySearch {
        visibility: visible;
    }
    button{
        padding: 0.5rem 2rem;
        border-radius: 5px;
        border: none;
        outline: none;
        font-size: 1.2rem;
        background-color: #00b4d8;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 100px;
    }
    button:hover{
        transform: translateY(5px);
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
    }
</style>
