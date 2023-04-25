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


<div class ='container'>
    <form on:submit|preventDefault>
        <h2>Sign up</h2>
        <div class = 'form-control'>
            <label for="name">Name:</label>
            <input type="text" id="name" bind:value={name} required />
        </div>
        <div class = 'form-control'>
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required />
        </div>
        <div class = 'form-control'>
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} required />
        </div>
        <div class = 'form-control'>
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
</div>


<style>
    .container {
        margin: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ff69b4;
  color: white;
}
    /* form styles */
    form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #252836;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
    h2 {
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
}
    .form-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
}
    label {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}
    input[type="text"],
    input[type="password"] {
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 1.2rem;
  background-color: #333644;
  color: white;
}
    button {
  margin-top: 2rem;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 1.2rem;
  background-color: #00b4d8;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}
    button:hover {
  background-color: #0096c7;
}
</style>
