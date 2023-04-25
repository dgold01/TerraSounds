<script lang="ts">
    import {getContext} from "svelte";

    const showSavedEvents = getContext('showSavedEvents')
    const showMap = getContext('showMap')
    const showHome = getContext('showHome')
    
</script> 


<div class = 'container'>
     <div class="header">
         <button on:click = {showHome} class="btn">Homepage</button>
         <button on:click = {showMap} class="btn">Back to map</button>
         <button on:click = {showSavedEvents} class="btn">Saved events</button>
     </div>
    <div class="profile">
        <h1>Profile</h1>
    </div>
    <div>
        <img class = 'avata' src = '../../src/avatas/avata.png'/>
    </div>
    <div class="info">
        <h2>John Doe</h2>
        <p>Current Location:London</p>
        <p>Favorite Music Genres: Funk, alternate rock, hip-hop/rap</p>
    </div>
 </div>   

<style>
    .btn {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: bold;
        color: #fff;
        background-color: #ff2e63;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .btn:hover {
        background-color: #ff569e;
    }
    
    .avata{
        width:40%;
        margin-left: 300px;
        
    }
    .info{
        padding-bottom: 20px;
    }
    .container{
       margin: -8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #ff69b4;
        color: white;;
    }
    .profile{
        position: absolute;
        font-size: 30px;
        top: 60px;
    }
    .header {
        bottom:40px;
        position: absolute;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }


</style>