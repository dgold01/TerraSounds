<script lang="ts">
    export let handleXclick 
    export let event
    let isEventSaved = false;
    let eventId
    import {saveEvent,getSavedEvents,deleteEvent} from "./ApiServices/eventsApiService";
    import {getContext, onMount} from "svelte";
    import {signedInStore} from "../stores/stores";
    const showSignIn = getContext('showSignIn')
    
    onMount( async () => {
        const events = await getSavedEvents()
        console.log(events)
        events.forEach((currentevent)=>{
            if(currentevent.title === event.title) {
                isEventSaved = true
                eventId = currentevent._id
            }
        })
    });
    async function updateEventId() {
        const events = await getSavedEvents()
        console.log(events)
        events.forEach((currentevent) => {
            if (currentevent.title === event.title) {
                isEventSaved = true
                eventId = currentevent._id
            }
        })
    }
</script>

<div  class="popup">
    <div class="popup-content">
        <div class="popup-header">
            <h2 class="popup-title">{event.title}</h2>
                <button on:click={() => handleXclick()}  class = 'xbut'>x</button>
        </div>
        <div class="popup-body">
            <div class="popup-image">
                <div class = 'desc'>
                    <h2> {event.description}</h2>
                </div>
                <img src="{event.image ? event.image:event.thumbnail}">
                    
            </div>
            <div class="popup-details">
                <p class="popup-venue">{event.venue.name}</p>
                <p class="popup-date">{event.date.when}</p>
                <a href="#" class="popup-link">{event.link}</a>
            </div>
            <span></span>
            <div class="popup-buttons">
                {#if $signedInStore}
                    {#if !isEventSaved}
                        <button on:click = {()=>{saveEvent(event);isEventSaved=true;updateEventId()}} class="popup-save">Save event</button>
                    {:else}
                        <button on:click = {()=>{deleteEvent(eventId);isEventSaved=false}} class="popup-save">Remove event</button>
                    {/if}
                <button class="popup-share">Share event</button>
                {:else}
                    <button on:click = {showSignIn} class="popup-save">Sign in to save</button>
                    <button on:click = {showSignIn} class="popup-save">Sign in to share</button>
                    {/if}
            </div>
        </div>
    </div>
</div>

<style>
    
    
    .popup-venue{
        font-size: 30px;
    }
    .popup-buttons{
        
        display: flex;
    }
    .popup-buttons button {
        padding: 20px 100px;
        margin-left: 10px;
        border: none;
        border-radius: 5px;
        background-color: #ff69b4;
        color: white;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .popup-buttons button:hover {
        background-color: magenta;
    }
    .popup {
        position: fixed;
        z-index: 99999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .desc{
        color: white;
        font-family: Georgia,serif;
       text-align: left;
       padding-left: 20px;
        padding-right: 0;
    }
    .popup-content {
        
        position: relative;
        background-color: #000000;
        margin: 10% auto;
        padding: 40px 60px;
        border: 1px solid #ffffff;
        width: 60%;
        
        max-width: 600px;
        border-radius: 20px;
        animation-name: popup-anim;
        animation-duration: 0.6s;
        animation-timing-function: ease-out;
    }

    .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }

    .popup-title {
        margin: 0;
        font-size: 40px;
        color: #ffffff;
        text-shadow: 2px 2px 0 #ff00ff, 4px 4px 0 #00ffff, 6px 6px 0 #ffff00;
    }

    .xbut {
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        font-size: 40px;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 2px 2px 0 #ff00ff, 4px 4px 0 #00ffff, 6px 6px 0 #ffff00;
        transition: transform 0.2s;
    }

    .xbut:hover {
        transform: rotate(90deg);
    }

    .popup-body {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .popup-image {
        display: flex;
        flex-direction: row-reverse;
        flex-basis: 100%;
        justify-content: space-around;
       
    }

    .popup-image img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }

    .popup-details {
        font-family: Georgia,serif;
        flex-basis: 55%;
        color:white;
    }


    .popup-link {
        padding-bottom: 20px;
        display: block;
        margin-top: 20px;
        margin-right:-270px;
        margin-left: 10px;
        font-size: 15px;
        color: #ffffff;
        text-decoration: none;
        border-bottom: 2px solid #ffffff;
        transition: border-color 0.2s;
    }

    .popup-link:hover {
        border-color: #ff00ff;
    }  
    
    
    </style>