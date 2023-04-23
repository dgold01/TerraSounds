<script lang="ts">
    import {getSavedEvents} from "./ApiServices/eventsApiService";
    import {onMount} from "svelte";
    let events 
    let hasLoaded
    console.log('test')
    onMount(async () => {
        console.log('tewt')
        events = await getSavedEvents() 
        hasLoaded =true 
    })
</script>

{#if hasLoaded}
<div class="container">
    <div class="header">
        <h1 class="title">My Saved Music Events</h1>
        <button class="btn">Add Event</button>
    </div>
        <div class="events">
            {#each events as { title, date,link,image,location}, i}
            <div class="event" >
                <div class="event-image">
                    <img src={image}/>
                </div>
                <div class="event-details">
                    <h2 class="event-title">{title }</h2>
                    <p class="event-location">{location }</p>
                    <p class="event-date">{ date.when }</p>
                    <a class="event-link" >{ link }</a>
                </div>
                <div class="event-actions">
                    <button class="btn btn-share">Share</button>
                    <button class="btn btn-delete">Remove</button>
                </div>
               
         </div>
            {/each}
</div>
</div>
    {/if}
                
<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        scroll-behavior: auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .title {
        font-size: 2rem;
        font-weight: bold;
        color: #fff;
    }

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

    .events {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 2rem;
    }

    .event {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-radius: 0.5rem;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .event-image {
        height: 200px;
        overflow: hidden;
    }

    .event-image img {
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease-in-out;
    }

    .event-image img:hover {
        transform: scale(1.1);
    }

    .event-details {
        padding: 1rem;
    }

    .event-title {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        font-weight: bold;
        color: #000;
    }

    .event-location {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        color: #333;
    }

    .event-date {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        color: #333;
    }

    .event-link {
        display: inline-block;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        font-weight: bold;
        color: #ff2e63;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
</style>