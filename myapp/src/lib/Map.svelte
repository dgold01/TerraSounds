<!-- Map.svelte -->
<script>
  import { onMount } from 'svelte';
  import {getEvents} from "./ApiService";
  import mapStyles from './styles.css'
  
  let map;
  let container;
  let events = []
  function initMap() {
    const address = (events[0].address).toString()
    console.log(address)
    const geocoder = new google.maps.Geocoder
    geocoder.geocode({
        'address': address
      },
      
      function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
         const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            icon: {
              url: "https://images.hellomagazine.com/horizon/landscape/9c075a171922-celinedion-t.jpg",
              scaledSize: new google.maps.Size(30, 30)
            },
          });
          const markerIcon = marker.getIcon();
          markerIcon.className = mapStyles.customMarker;
          marker.setIcon(markerIcon);
          const content = `
        <div>
          <h3>${events[0].title}</h3>
          <p>${events[0].address}</p>
          <p>${events[0].date.when}</p>
          <a>${events[0].link}</a>
        </div>
     `
          // const infobox = new InfoBox({
          //   content: content,
          //   disableAutoPan: false,
          //   maxWidth: 0,
          //   pixelOffset: new google.maps.Size(-140, -200),
          //   zIndex: null,
          //   closeBoxMargin: "0px 0px 0px 0px",
          //   closeBoxURL: "",
          //   infoBoxClearance: new google.maps.Size(1, 1),
          //   isHidden: false,
          //   pane: "floatPane",
          //   enableEventPropagation: false
          // });
          // infobox.open(map,marker)

          map.setCenter(results[0].geometry.location);
        }
      })
    map = new google.maps.Map(container, {
      zoom: 12,
      center: { lat: -34.397, lng: 150.644 },
      disableDefaultUI: true,
      styles:customStyle
    });
  }
  onMount(async () => {
    events = await getEvents()
    const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    window.initMap = initMap;
    document.head.appendChild(script);
  });


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
</style>
<div class="full-screen" bind:this={container}></div>


