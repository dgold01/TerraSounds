<script>
    import {getContext} from "svelte";
    let email = "";
    let password = "";

    const handleSignIn = getContext('handleSignIn')
    const showSignUp = getContext('showSignUp')
    
</script>
    <div class="container">
        <form on:submit|preventDefault>
            <h2>Login</h2>
            <div class="form-control">
                <label for="email">email:</label>
                <input type="text" id="email" bind:value={email} required />
            </div>
            <div class="form-control">
                <label for="password">Password:</label>
                <input type="password" id="password" bind:value={password} required />
            </div>
            <button on:click ={handleSignIn(email)} type="submit">Login</button>
            <button on:click={showSignUp}  class ='sign' type="submit">Don't have an account? Sign up here</button>
        </form>
    </div>
<style>
    /* container styles */
    .sign{
        font-size: 15px;
    }
    .container {
        margin :-8px;
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
