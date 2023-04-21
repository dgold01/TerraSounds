<!-- Map.svelte -->
<script lang="ts">
    import {afterUpdate, onMount} from 'svelte';
    import {getEvents} from "./ApiService";
    import NavBar from "./NavBar.svelte";
    import mapStyles from './styles.css?inline'
    let map;
    let pos;
    let city;
    let container;
    let events = []
    let isLoading = true;
    export let chosenCity
    export let isLocal
    console.log(chosenCity)
    console.log(isLocal)
    async function initMap() {                           //takes time to create the map, so this is carried out as a callback functiion, called in the onMount of this component.
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
        createEvents()
    }
    onMount(async () => {
        const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
        script.async = true;
        window.initMap = initMap;
        document.head.appendChild(script);
    });
    const createEvents = async () => {
        const geocoder = new google.maps.Geocoder();
        const processEvents = async (events) => {
            for (let event of events) {
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
                                    url:event.image,
                                    scaledSize: new google.maps.Size(30, 30)
                                },
                                shape: shape
                            });
                            // const markerIcon = marker.getIcon();
                            // markerIcon.className = mapStyles.customMarker;
                            // marker.setIcon(markerIcon);
                            //
                            const content = `
                                     <div>
                                       <h3>${event.title}</h3>
                                       <p>${event.address}</p>
                                       <p>${event.date.when}</p>
                                       <a>${event.link}</a>
                                     </div> `
                            const infoWindow = new google.maps.InfoWindow({
                                content: content,
                            });
                            marker.addListener('click', () => {
                                if (infoWindow) {
                                    infoWindow.close();
                                }
                                infoWindow.open(map, marker);
                            });
                            map.addListener('click', () => {
                                if (infoWindow) {
                                    infoWindow.close();
                                }
                            });
                        }
                    })
            }
        }
        if(isLocal) {
            await geocoder.geocode({location: pos}, async (results, status) => {
                if (status === 'OK') {
                    const addressComponents = results[0].address_components;
                    for (let i = 0; i < addressComponents.length; i++) {
                        const types = addressComponents[i].types;
                        if (types.includes("locality") || types.includes("administrative_area_level_2")) {
                            city = addressComponents[i].long_name;
                            events = await getEvents(city)
                            console.log(events.length)
                            await processEvents(events) // waits for the markers to be created
                            isLoading = false;
                            break;
                        }
                    }
                }
            })
        }
        else {
            events = await getEvents(chosenCity)
            await processEvents(events)
            await geocoder.geocode({address: chosenCity}, (results, status) => {
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
<NavBar></NavBar>
<div bind:this={container} class="full-screen"></div>


