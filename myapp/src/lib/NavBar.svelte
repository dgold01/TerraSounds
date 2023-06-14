<script>
  import {signedInStore} from "../stores/stores";
  import {onMount} from "svelte";
  let Login
  let showLogin = false
  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  async function loadLogin(){
    const module = await import ('../lib/Login.svelte')
    Login = module.default
  }
  
  async function handleShowLogin() {
    await loadLogin()
    showLogin = !showLogin;
  }
  onMount(()=>{
    const token = getCookie('token');
    const userId = localStorage.getItem('userId')
    if(userId || token){
      signedInStore.set(true)
    }
    
  })
</script>

<div>
    <a href="/"><img  class ="logo" src='../../src/avatas/logo-removebg-preview.png' ></a>
</div>
<div class="nav">
    {#if $signedInStore}
        <a class="nav-button-link" href="myevents">MY EVENTS</a>
        <a class="nav-button-link" href="account">MY ACCOUNT</a>
    {:else}
        <button class="nav-button" on:click={handleShowLogin}>Login</button>
        <button class="nav-button" on:click={handleShowLogin}>Sign up</button>
    {/if}
</div>
{#if showLogin}
    <Login {handleShowLogin}></Login>
{/if}

<style>
    .logo{
        position: absolute;
        width:4vw;
        top:5px;
        left:5px;
        background-color: #f3c2c2;
    }
    .nav{
        position: absolute;
    }
    .nav-button{
        z-index: 100;
        display: inline-block;
        padding: 3px 12px;
        background-color: white;
        color: black;
        border: none;
        border-radius: 2vw;
        text-decoration: none;
        cursor: pointer;
        font-size: 15px;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
    }
    .nav-button-link {
        z-index: 100;
        display: inline-block;
        padding: 3px 12px;
        background-color: white;
        color: black;
        border: none;
        border-radius: 2vw;
        text-decoration: none;
        cursor: pointer;
        font-size: 15px;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
    }


    .nav {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }

    .nav button {
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
    }

    .nav button:hover {
        opacity: 0.8;
    }

    .nav a.active {
        opacity: 1;
        font-weight: bold;
    }

    .nav a {
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
    }

    .nav a:hover {
        opacity: 0.8;
    }

    .nav a.active {
        opacity: 1;
        font-weight: bold;
    }
</style>