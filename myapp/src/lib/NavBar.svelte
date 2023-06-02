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
    <div class = 'menuButton'>
        <button class="hamburger-btn">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </button>
    </div>
    <div class='searchContainer'>
        <CitySearch></CitySearch>
    </div>

</nav>
<!-- Your CSS styling for the navbar -->
<style>
    .navbar {
        position: absolute;
        z-index: 100;
    }
    .menuButton{
       position: absolute;
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
</style>
