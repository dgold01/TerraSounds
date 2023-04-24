<!-- Map.svelte -->
<script lang="ts">
    import {onMount} from 'svelte';
    import {getEvents} from "./ApiServices/eventsApiService";
    import NavBar from "./NavBar.svelte";
    import EventWindow from "./EventWindow.svelte";
    import {cityStore} from "../stores/stores";
    let map;
    let pos;
    let showEvent;
    let city;
    let container;
    let currentEvent
    let events = []
    let isLoading = true;
    let lastCallToGoogleTimestamp = undefined;
    
    export let isLocal
    export let handleSearchClick
    
    function handleClickX(){
        showEvent = false;
        // noRender = true;
    }
    async function initMap() {                           //takes time to create the map, so this is carried out as a callback functiion, called in the onMount of this component.
        console.log("initMap called")
        map = new google.maps.Map(container, {
            zoom: 12,
            center: {lat: -34.397, lng: 150.644},
            disableDefaultUI: true,
            styles: customStyle
        });
        if (isLocal) {
            pos = await getLocation()
            map.setCenter(pos);
        }
        await createEvents()
    }
    onMount(async () => {
        const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
        script.async = true;
        window.initMap = initMap;
        document.head.appendChild(script);
        const unsubsribed = cityStore.subscribe(() => {
            if (window.google) {
                isLocal = false
                console.log($cityStore)
                //await new Promise(res => setTimeout(res, 1000))
                createEvents()
            }
        })
       return unsubsribed
    });
    const processEvents = async (events) => {
        console.log('processEvents called')
        
        const geocoder = new google.maps.Geocoder();
        for (let event of events) {
            try {
                console.log("request event: " + event.title)
                const address = (event.address).toString()
                await geocoder.geocode({'address': address},
                    function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            let shape = {
                                coords: [25, 25, 25],
                                type: 'circle'
                            };
                            const marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map,
                                icon: {
                                    url: event.image,
                                    scaledSize: new google.maps.Size(30, 30)
                                },
                                shape: shape
                            });
                            marker.addListener('click', () => {
                                showEvent = true;
                                currentEvent = event
                            });
                            // document.addEventListener('click',(e)=>{
                            //    
                            //     const eventWindow = document.getElementById('eventWindow');
                            //     if(!eventWindow.contains(e.target as Node)) showEvent = false;
                            // })
                        }
                    }
                )
                await new Promise(res => setTimeout(res,80))
            } catch(e) {
                console.log(e)
            }
        }
    }
    
    const createEvents = async () => {
        // await processEvents(events)
        console.log("createEvents called")
        console.log(isLocal)

        await new Promise(res => setTimeout(res, (lastCallToGoogleTimestamp + 10000) - Date.now()));
        console.log("finished waiting")
        
        if(isLocal) {
            const geocoder = new google.maps.Geocoder();// this looks to see if current location was chosen, and creates markers around this location. 
            await geocoder.geocode({location: pos}, async (results, status) => {
                if (status === 'OK') {
                    const addressComponents = results[0].address_components;
                    for (let i = 0; i < addressComponents.length; i++) {
                        const types = addressComponents[i].types;
                        if (types.includes("locality") || types.includes("administrative_area_level_2")) {
                            city = addressComponents[i].long_name;
                            events = await getEvents(city)
                            // console.log(events.length)
                            await processEvents(events) // waits for the markers to be created
                            isLoading = false;
                            break;
                        }
                    }
                }
            })
        }
        else {
            const geocoder =new google.maps.Geocoder();
            events = await getEvents($cityStore)
            console.log(events)
            await processEvents(events)
            console.log($cityStore)
            await geocoder.geocode({address: $cityStore}, (results, status) => {
                if (status === 'OK') {
                    // Set the center of the map to the latitude and longitude coordinates of the first result
                    const location = results[0].geometry.location;
                    map.setCenter({lat: location.lat(), lng: location.lng()});
                } else {
                    console.error(`Geocode was not successful for the following reason: ${status}`);
                }
            });
            isLoading = false;
        }

        lastCallToGoogleTimestamp = Date.now();
    }
    async function getLocation(): Promise<{ lat: number, lng: number }> {
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                } else {
                    reject(new Error('Geolocation is not supported'));
                }
            });
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            return pos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const customStyle = [

        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "gamma": 0.5
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 13
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#144b53"
                },
                {
                    "lightness": 14
                },
                {
                    "weight": 1.4
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#08304b"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#0c4152"
                },
                {
                    "lightness": 5
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#0b434f"
                },
                {
                    "lightness": 25
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#0b3d51"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#146474"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#021019"
                }
            ]
        }
    ];
</script>
<style>
    .full-screen {
        width: 100vw;
        height: 100vh;
    }
    .customMarker {
        border-radius: 50%;
    }
    .loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #673ab7, #e91e63, #ffeb3b);
        background-size: 600% 600%;
        animation: gradient 5s ease infinite;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>
<div class={isLoading ? 'loading' : ''}>
    {#if isLoading}
        <h1>Retrieving your events!</h1>
    {/if}
</div>
<NavBar handleSearchClick={handleSearchClick}></NavBar>
<div id = "map" bind:this={container} class="full-screen"></div>
{#if showEvent}
    <EventWindow  handleXclick ={handleClickX} id = 'eventWindow' event = {currentEvent} ></EventWindow>
{/if}


