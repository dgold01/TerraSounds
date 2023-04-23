<!-- Your HTML code for the navbar -->
<script>
  import CitySearch from "$lib/CitySearch.svelte";
  export  let handleSearchClick
</script>
<nav class="navbar">
    <button class="navbar-button">
        <span class="navbar-button-icon"></span>
    </button>
    <div class="navbar-expand">
        Selected a different city
        <CitySearch handleSearchClick={handleSearchClick} class="citySearch"></CitySearch>
    </div>
    
</nav>
<!-- Your CSS styling for the navbar -->
<style>
    .navbar {
        background-color: #1c1c1c;
        color: #fff;
        display: flex;
        justify-content: center;
        padding: 0.5rem;
        height: 10px;
        position: relative;
    }

    .navbar:hover {
        opacity: 1;
        height: 200px;
        transition: height 0.3s ease-in-out;
    }

    .navbar-button {
        background: none;
        border: none;
        cursor: pointer;
        height: 30px;
        width: 30px;
        position: relative;
    }

    .navbar-button-icon {
        background-color: #fff;
        height: 1px;
        top: 6px;
        position: absolute;
        width: 100%;
    }

    .navbar-button-icon::before {
        top: -8px;
    }

    .navbar-button-icon::after {
        top: 8px;
    }

    .navbar-expand {
        position: absolute;
        bottom: 70px;
        left: 20px;
        right: 0;
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease-in-out;
    }

    .citySearch {
        display: flex;
        flex-direction: row;
        
        visibility: hidden;
    }

    .navbar:hover .navbar-expand {
        height: 100px;
    }

    .navbar:hover .citySearch {
        visibility: visible;
    }
</style>
