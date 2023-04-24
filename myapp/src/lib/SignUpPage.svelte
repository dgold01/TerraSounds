<script>
  import {saveUser} from './ApiServices/usersApiService'
  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  import {getContext} from "svelte";
    
  const handleSignIn = getContext('handleSignIn')
  console.log(handleSignIn)
  
</script>

<main>
    <h1>Sign Up</h1>
    <form on:submit|preventDefault>
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" bind:value={name} required />
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} required />
        </div>
        <div>
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" bind:value={confirmPassword} required />
        </div>
        {#if name && email && password && confirmPassword && password === confirmPassword}
            <button on:click = {()=>{saveUser(name,email,password); handleSignIn(email)}}  type="submit">Sign Up</button>
        {:else if name || email || password || confirmPassword}
            <p>Please fill out all fields and make sure passwords match.</p>
        {:else}
            <p>Please enter your sign-up information.</p>
        {/if}
    </form>
</main>
