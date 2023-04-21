<!-- Your HTML code for the navbar -->
<script>
  import CitySearch from "$lib/CitySearch.svelte";
</script>
<nav class="navbar">
    <button class="navbar-button">
        <span class="navbar-button-icon"></span>
    </button>
    <CitySearch class ="citySearch" ></CitySearch>
</nav>
<!-- Your CSS styling for the navbar -->
<style>
    .citySearch{
        visibility: hidden;
        display: flex;
        align-self: end;
        flex-direction:row;
    }
    .citySearch:hover{
        height: 100px;
        transition: height 0.3s ease-in-out;
    }
    .navbar {
        background-color: #1c1c1c;
        color: #fff;
        display: flex;
        justify-content: center;
        padding: 0.5rem;
        height: 10px;
        z-index: -10;
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
        top:6px;
        position: absolute;
        width: 100%;
    }
    .navbar-button-icon::before {
        top: -8px;
    }

    .navbar-button-icon::after {
        top: 8px;
    }
</style>
