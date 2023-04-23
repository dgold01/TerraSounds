
    <div class="container">
        <form on:submit|preventDefault={handleLogin}>
            <h2>Login</h2>
            <div class="form-control">
                <label for="username">Username:</label>
                <input type="text" id="username" bind:value={username} required />
            </div>
            <div class="form-control">
                <label for="password">Password:</label>
                <input type="password" id="password" bind:value={password} required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>


<script>
  let username = "";
  let password = "";

  function handleLogin() {
    // handle login logic here
  }
</script>

<style>
    /* container styles */
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #1c1e26;
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
