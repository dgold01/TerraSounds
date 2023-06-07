<!-- Map.svelte -->
<script lang="ts">
    import {onMount} from 'svelte';
    import {GoogleSpin} from "svelte-loading-spinners";
    import {getEvents} from "./ApiServices/eventsApiService";
    import NavBar from "./NavBar.svelte";
    import EventWindow from "./EventWindow.svelte";
    import {cityStore, isLocalStore, isLightStore} from '../stores/stores'

    let isLight = false;
    let map;
    let pos;
    let showEvent;
    let city;
    let container;
    let currentEvent
    let events = []
    let isLoading = true;
    let mapReady = false;
    let lastCallToGoogleTimestamp = undefined;
    let screenWidth
    let screenHeight
    $: mapStyle = `width: ${screenWidth}px; height: ${screenHeight}px;`;
    $: loadingStyle = `width: ${screenWidth}px; height: ${screenHeight}px;`;
    onMount(async () => {
        screenWidth = window.innerWidth
        screenHeight = window.innerHeight
        window.addEventListener('resize', handleResize)
        const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&callback=initMap`;
        script.async = true;
        window.initMap = initMap;
        document.head.appendChild(script);
        const unsubsribedCity = cityStore.subscribe(() => {
            if (window.google) {
                isLocalStore.set(false)
                console.log($cityStore)
                createEvents()
            }
        })
        const unsubsribedIsLocal = isLocalStore.subscribe(() => {
            isLoading = true
            initMap()
        })
        const unsubsribedIsLight = isLightStore.subscribe(() => {
            isLight = $isLightStore === 'light';
            initMap()
        })
        return [unsubsribedCity, unsubsribedIsLight,unsubsribedIsLocal];
    });

    async function initMap() {                           //takes time to create the map, so this is carried out as a callback functiion, called in the onMount of this component.
        const mapStyles = isLight ? customSyleLight : customStyleDark;
        map = new google.maps.Map(container, {
            zoom: 12,
            center: {lat: -34.397, lng: 150.644},
            disableDefaultUI: true,
            styles: mapStyles
        });
        if ($isLocalStore) {
            pos = await getLocation()
            map.setCenter(pos);
            const marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: {
                    url: '../../src/avatas/avata.png',
                    scaledSize: new google.maps.Size(50, 30),
                    anchor: new google.maps.Point(15, 15),
                },
            });
        }
        mapReady = true
        await createEvents()
    }

    function handleClickX() {
        showEvent = false;
    }

    async function handleResize() {
        await new Promise(res => setTimeout(res, 300))
        screenWidth = window.innerWidth
        screenHeight = window.innerHeight
        google.maps.event.trigger(map, 'resize'); // triggers the map resize. can be used to reposition markers if needed
    }

    const processEvents = async (events) => {
        function calculateCircleRadius(zoom) {
            const radiusFactor = 1500000;
            return radiusFactor / Math.pow(2, zoom);
        }

        const geocoder = new google.maps.Geocoder();
        for (let event of events) {
            try {
                console.log("request event: " + event.title)
                const address = (event.address).toString()
                await geocoder.geocode({'address': address},
                    async function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            let shape = {
                                coords: [25, 25, 25],
                                type: 'circle'
                            };
                            const marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map,
                                icon: {
                                    url: '',
                                    anchor: new google.maps.Point(25, 25),
                                },
                                shape: shape
                            });
                            const color = isLight ? 'dark' : 'white'
                            const url = event.image ? event.image : event.thumbnail
                            const iconImg = url;

                            const clippedIconImg = new Image();
                            clippedIconImg.crossOrigin = 'anonymous';
                            clippedIconImg.src = iconImg;
                            await clippedIconImg.decode(); // wait for the image to load

                            const canvas = document.createElement("canvas");
                            canvas.width = 100;
                            canvas.height = 100;
                            const ctx = canvas.getContext("2d");
                            ctx.beginPath();
                            ctx.arc(50, 50, 25, 0, 2 * Math.PI);
                            ctx.clip();
                            ctx.imageSmoothingQuality = 'high'
                            ctx.drawImage(clippedIconImg, 0, 0, 100, 100);
                            ctx.beginPath();
                            ctx.arc(50, 50, 54, 0, 2 * Math.PI);
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 65;
                            ctx.stroke();
                            const clippedIconUrl = canvas.toDataURL();
                            marker.setIcon({
                                url: clippedIconUrl,
                                scaledSize: new google.maps.Size(100, 100),
                                anchor: new google.maps.Point(50, 50),
                            });
                            const circleInvisible = new google.maps.Circle({
                                map: map,
                                center: marker.getPosition(),
                                radius: calculateCircleRadius(map.getZoom()),
                                clickable: true,
                                strokeWeight: 0,
                                fillOpacity: 0,
                            });
                            let markerImageSize = new google.maps.Size(200, 200);
                            let markerImageAnchor = new google.maps.Point(100, 100);
                            google.maps.event.addListener(circleInvisible, 'mouseover', function () {
                                marker.setIcon({
                                    url: clippedIconUrl,
                                    scaledSize: markerImageSize,
                                    anchor: markerImageAnchor
                                });
                                marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
                                marker.setAnimation(google.maps.Animation.BOUNCE);
                                circleInvisible.setRadius(calculateCircleRadius(map.getZoom()) * 3)
                            });
                            google.maps.event.addListener(circleInvisible, 'mouseout', function () {
                                marker.setIcon({
                                    url: clippedIconUrl,
                                    scaledSize: new google.maps.Size(100, 100),
                                    anchor: new google.maps.Point(50, 50)
                                });
                                marker.setAnimation(null);
                                circleInvisible.setRadius(calculateCircleRadius(map.getZoom()))
                            });
                            google.maps.event.addListener(circleInvisible, 'click', function () {
                                showEvent = true;
                                currentEvent = event;
                            });
                            google.maps.event.addListener(marker, 'mousedown', function (event) {
                                showEvent = true;
                                currentEvent = event;
                            });
                        }
                    }
                )
                await new Promise(res => setTimeout(res, 80))
            } catch (e) {
                console.log(e)
            }
        }
        isLoading = false;
    }
    const createEvents = async () => {
        // await processEvents(events)
        console.log("createEvents called")
        isLoading = true
        await new Promise(res => setTimeout(res, (lastCallToGoogleTimestamp + 10000) - Date.now()));
        console.log("finished waiting")
        if ($isLocalStore) {
            const geocoder = new google.maps.Geocoder();// this looks to see if current location was chosen, and creates markers around this location. 
            await geocoder.geocode({location: pos}, async (results, status) => {
                if (status === 'OK') {
                    const addressComponents = results[0].address_components;
                    for (let i = 0; i < addressComponents.length; i++) {
                        const types = addressComponents[i].types;
                        if (types.includes("locality") || types.includes("administrative_area_level_2")) {
                            city = addressComponents[i].long_name;
                            events = await getEvents(city)
                            await processEvents(events) // waits for the markers to be created
                            isLoading = false;
                            break;
                        }
                    }
                }
            })
        } else {
            console.log($cityStore, 'here')
            const geocoder = new google.maps.Geocoder();
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
            console.log('here')
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

    const customSyleLight = [{featureType: "poi", elementType: "labels", stylers: [{visibility: "off"}]},
        {
            featureType: "poi.park",
            elementType: "labels",
            stylers: [{visibility: "on"}]
        }, {
            featureType: "administrative.locality",
            elementType: "labels",
            stylers: [{visibility: "on"}]
        }, {
            featureType: "transit",
            elementType: "labels",
            stylers: [{visibility: "off"}]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{visibility: "off"}]
        }, {
            featureType: "administrative",
            elementType: "labels",
            stylers: [{visibility: "off"}]
        }, {
            featureType: "water",
            elementType: "labels",
            stylers: [{visibility: "off"}]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [{color: "#f2f2f2"}]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{color: "#ffffff"}]
        }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{color: "#ffffff"}]
        }, {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [{visibility: "off"}]
        }, {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [{color: "#666666"}]
        }, {
            "featureType": "all",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": 75}, {"gamma": 0.5}]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#555555"
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
                    "color": "#f7f7f7"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
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
                    "color": "grey"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#dddddd"
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
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#dddddd"
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
                    "color": "lightgrey"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#888888"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#c7eced"
                }
            ]
        }
    ];
    const customStyleDark = [{featureType: "poi", elementType: "labels", stylers: [{visibility: "off"}]},
        {
            featureType: "poi.park",
            elementType: "labels",
            stylers: [{visibility: "on"}]
        }, {
            featureType: "administrative.locality",
            elementType: "labels",
            stylers: [{visibility: "on"}]
        }, {
            featureType: "transit",
            elementType: "labels",
            stylers: [{visibility: "off"}]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{visibility: "off"}]
        }, {
            featureType: "administrative",
            elementType: "labels",
            stylers: [{visibility: "off"}]
        }, {
            featureType: "water",
            elementType: "labels",
            stylers: [{visibility: "off"}]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [{color: "#f2f2f2"}]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{color: "#ffffff"}]
        }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{color: "#ffffff"}]
        }, {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [{visibility: "off"}]
        }, {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [{color: "#666666"}]
        },

        {
            "featureType": "all",
            "elementType": "all",
            "stylers":

                [
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
        position: relative;
        overflow: hidden;
        z-index: 2;
    }

    .loading {
        position: absolute;
        background: linear-gradient(135deg, #2c3e50, #8e44ad);
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

{#if isLoading}
    <div style={loadingStyle} class='loading'>
        <GoogleSpin size="100px"></GoogleSpin>
    </div>
{:else}
    <NavBar></NavBar>
    {#if showEvent}
        <EventWindow handleXclick={handleClickX} id='eventWindow' event={currentEvent}></EventWindow>
    {/if}
{/if}
<div id="map" style={mapStyle} bind:this={container} class="full-screen"></div>