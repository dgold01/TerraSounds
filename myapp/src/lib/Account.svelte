<script lang="ts">
    import Profile from "$lib/Profile.svelte";
    import {onMount} from "svelte";
    let showProfile = true;
    let showFriends = false;
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


<div style={containerStyle} class='container'>
    <div class="myaccount">
        <h1>My Account</h1>
    </div>
    <nav class="nav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a href="#" class="nav-link">Profile Details</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Friends</a>
            </li>
        </ul>
    </nav>
    {#if showProfile}
        <Profile></Profile>
    {:else}
    {/if}
</div>

<style>
    
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f3c2c2;
    }
    .myaccount {
        color: white;
        font-size: 2vw;
    }
    .nav{
       margin-top: -30px;
    }
    .navbar-nav {
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .nav-item {
        margin-right: 10px;
    }
    .nav-link {
        color: #fff;
        text-decoration: none;
    }

 

</style>