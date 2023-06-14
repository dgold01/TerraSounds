<script lang="ts">
    import {getSavedEvents, deleteEvent} from "./ApiServices/eventsApiService";
    import {getContext, onMount} from "svelte";
    import {eventsStore} from "../stores/stores";
    import {slide} from "svelte/transition";
    import EventSearch from "$lib/EventSearch.svelte";

    let test;
    let hasLoaded
    let screenHeight
    let screenWidth
    
    async function getEvents() {
        const events = await getSavedEvents()
        eventsStore.set(events)
        console.log($eventsStore)
    }

    onMount(() => {
        screenWidth = window.innerWidth
        screenHeight = window.innerHeight
        window.addEventListener('resize', () => {
            screenWidth = window.innerWidth
            screenHeight = window.innerHeight
        })
    })
    $: backgroundStyle = `width: ${screenWidth}px; height: ${screenHeight}px;`;

    async function deleteEventHandler(_id) {
        const events = document.querySelectorAll('.event')

        await deleteEvent(_id);
        console.log(test);
        console.log('here')
        getEvents()
    }

    //
    // onMount(() => {
    //     getEvents()
    //     hasLoaded = true
    // })
    //
    // const showMap = getContext('showMap')
    // const showHome = getContext('showHome')
    // const showProfile = getContext('showProfile')
</script>
<div style={backgroundStyle} class='background'>
    <EventSearch></EventSearch>
    <h1 class="headers">Your upcoming events</h1>
    <div class="container-upcomingEvents">
        <div class="events">
            {#each $eventsStore as {title, date, link, image, venue, _id}, i}
                <div transition:slide class="event">
                    <div class="event-image">
                        <img src={image}/>
                    </div>
                    <div class="event-details">
                        <h2 class="event-title">{title }</h2>
                        <p class="event-location">{venue}</p>
                        <p class="event-date">{ date }</p>
                        <a class="event-link">{ link }</a>
                    </div>
                    <div class="event-actions">
                        <button class="btn btn-share">Share</button>
                        <button on:click={deleteEventHandler(_id)} class="btn btn-delete">Remove</button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <h1 class="headers">Your past events</h1>
</div>

<style>


    .background {
        background-color: #f3c2c2;
        display: flex;
        flex-direction: column;
    }


    .headers {
        margin-top: 100px;
        margin-left: 40px;
        font-family: 'Roboto', sans-serif;
        align-self: flex-start;
    }


    .btn:hover {
        background-color: #ff569e;
    }

    .events {

        transition: transform 0.3s ease-in-out;
        padding-top: 60px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 2rem;
    }

    .event {
        opacity: 1;
        transition: opacity 0.3s ease-in-out, height 0.3s ease-in-out;
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