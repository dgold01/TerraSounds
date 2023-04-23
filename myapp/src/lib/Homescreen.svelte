    
    <script lang="ts">
        import CitySearch from "./CitySearch.svelte";
        import SavedEvents from "./SavedEvents.svelte";
        import LoginPage from "./LoginPage.svelte";
        import SignUpPage from "$lib/SignUpPage.svelte";
        import {getUsers} from "./ApiServices/usersApiService";
        let showSavedEvents
        let showLoginPage
        let showSignUpPage
        let signedIn
        let userId
        export let handleClick
        export let handleSearch
        export let showSearch
        export let handleSearchClick
        
        
    </script>
    <div class="container">
        <div class="header">
            <h1 class="logo">TerraSounds</h1>
            <div class="nav">
                {#if signedIn}
                    <a on:click ={()=>{showSavedEvents=true}} href="#">Saved Events</a>
                    <a on:click ={()=>{showSavedEvents=true}} href="#">Profile</a>
                    {:else}
                    <a on:click ={()=> {showLoginPage= true}} href="#">Login</a>
                    <a on:click ={()=> {showSignUpPage = true}}  href="#">Sign up</a>
                    {/if}
            </div>
        </div>
        {#if showSavedEvents}
            <SavedEvents></SavedEvents>
        {:else if showLoginPage}
            <LoginPage ></LoginPage>
        {:else if showSignUpPage}
           <SignUpPage  ></SignUpPage>
        {:else}
       
        <div class="hero">
            <span>
            <button id ='current' class="cta" on:click={()=>handleClick}>Current Location</button>
            <button id ='choose' class="cta" on:click= {()=>handleSearch} >Choose Location</button>
            {#if showSearch}
            <CitySearch handleSearchClick = {handleSearchClick} class = ''></CitySearch>
            {/if}
            </span>
            <span></span>
            <div class="earth">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1024px-The_Earth_seen_from_Apollo_17.jpg" alt="Earth" />
            </div>
            <h2 class="title">Discover music events from around the world</h2>
        </div>
        
        {/if}
    </div>


<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #ff69b4;
    }

    .header {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        padding: 1rem;
    }

    .logo {
        font-size: 2rem;
        font-weight: bold;
        color: #1e90ff;
    }

    .nav {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }

    .nav a {
        color: #1e90ff;
        font-size: 1.2rem;
        text-decoration: none;
        opacity: 0.7;
        transition: opacity 0.2s ease-in-out;
    }

    .nav a:hover {
        opacity: 1;
    }

    .nav a.active {
        opacity: 1;
        font-weight: bold;
    }

    .hero {
        
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: 3rem;
    }

    .earth {
        width: 300px;
        height: 300px;
        margin-bottom: 3rem;
        margin-top: 20px;
        animation: spin 10s linear infinite;
    }

    .earth img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0px 0px 50px 10px #1e90ff;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    
    .title {
        
        font-size: 3rem;
        font-weight: bold;
        color: #1e90ff;
    }

    .subtitle {
        font-size: 1.5rem;
        color: #1e90ff;
        margin-bottom: 2rem;
    }

    .cta {
        
        font-size: 1.2rem;
        font-weight: bold;
        color: #fff;
        background-color: #ff69b4;
        border: none;
        border-radius: 4px;
        padding: 1rem 2rem;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
    }

    .cta:hover {
        background-color: blueviolet;
    }  
    
</style>