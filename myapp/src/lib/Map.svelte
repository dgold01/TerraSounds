<!-- Map.svelte -->
<script lang="ts">
  import {afterUpdate, onMount} from 'svelte';
  import {getEvents} from "./ApiService";
  import mapStyles from './styles.css?inline'
  let map;
  let city;
  let container;
  let events = []
  let isLoading = true;
  function initMap() {
      map = new google.maps.Map(container, {
          zoom: 12,
          center: {lat: -34.397, lng: 150.644},
          disableDefaultUI: true,
          styles: customStyle
      });
      getLocation()
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
      let pos = await getLocation()
      console.log(pos)
       await geocoder.geocode({location: pos}, async (results, status) => {
           if (status === 'OK') {
               console.log('map')
               const addressComponents = results[0].address_components;
               for (let i = 0; i < addressComponents.length; i++) {
                   const types = addressComponents[i].types;
                   console.log(types)
                   if (types.includes("locality") || types.includes("administrative_area_level_2")) {
                       // If we find the city, set the city variable and log it to the console
                       city = addressComponents[i].long_name;
                       console.log(`City: ${city}`);
                       events = await getEvents(city)
                       console.log(events)
                       await processEvents(events)
                       isLoading = false;
                       break;
                   }
               }
           }
       })
       const processEvents = async (events)=>{
       for (let event of events) {
           console.log(event)
           const address = (event.address).toString()
           console.log(address)
           const geocoder = new google.maps.Geocoder
           await geocoder.geocode({
                   'address': address
               },
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
                               url: "https://images.hellomagazine.com/horizon/landscape/9c075a171922-celinedion-t.jpg",
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
         </div>
      `
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

  }}


  async function getLocation(): Promise<{lat: number, lng: number}> {
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
          map.setCenter(pos);
          console.log(pos);
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
    <h1>Loading</h1>
</div>
<div class="full-screen" bind:this={container}></div>


