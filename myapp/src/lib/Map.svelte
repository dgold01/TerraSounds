<!-- Map.svelte -->
<script>
  import { onMount } from 'svelte';
  import {getEvents} from "./ApiService";
  let map;
  let container;
  let events = []
  function initMap() {
    const address = (events[0].address).toString()
    console.log(address)
    const geocoder = new google.map.Geocoder()
    geocoder.geocode({
        'address': address
      },
      function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          new google.maps.Marker({
            position: results[0].geometry.location,
            map: map
          });
          map.setCenter(results[0].geometry.location);
        }
      })
  }
  onMount(async () => {
    events = await getEvents()
    const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.defer = true;
    script.async = true;
    window.initMap = initMap;
    document.head.appendChild(script);
  });
</script>
<style>
    .full-screen {
        width: 100vw;
        height: 100vh;
    }
</style>
<div class="full-screen" bind:this={container}></div>
