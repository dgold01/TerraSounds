<script lang="ts">

    // import googleLogo from '../../public/Google_Logo.svg'
    import {
        // createUsers,
        loginUser,
        findEmail,
        createUser
    } from './ApiServices/usersApiService';
    import {onMount} from "svelte";
    import {signedInStore} from "../stores/stores";

    let LoadingIndicator
    import {scale} from 'svelte/transition'

    export let handleShowLogin
    let loading
    let hasAccount = false
    let register = false
    let initial = true
    let email = ''
    let password = ''
    let firstName = ''
    let lastName = ''

    let shrinkEmailLabel = false
    let shrinkPasswordLabel = false
    let shrinkFirstNameLabel = false
    let shrinkLastNameLabel = false


    async function useLoadingIndicator() {
        const module = await import ('./LoadingIndicator.svelte')
        LoadingIndicator = module.default
    }

    async function emailExists(email: string) {
        try {
            const result = await findEmail(email);
            console.log(result)
            return result;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async function handleContinueWithEmail() {

        // check if email exists
        // if email exists set setLogin and setSeen to true
        // check if password is correct

        // if email does not exist
        // set setRegister to true
        await useLoadingIndicator()
        loading = true
        const result = await emailExists(email)
        loading = false
        console.log(result)
        if (await emailExists(email)) {
            initial = false
            hasAccount = true
        } else {
            initial = false
            register = true
        }
    }

    async function handleLogin() {
        try {
            loading = true
            console.log(email,password,'hi')
            const user = await loginUser({email, password});
            document.cookie = `token=${user.token}; path=/`;
            cookieStorage();
            // console.log(user);
            console.log('Login successful');
            signedInStore.set(true)
            loading = false
            handleShowLogin()
        } catch (error) {
            console.log(error)
        }

    }
    

    function cookieStorage() {
        // setting the userId in local storage
        const cookieValue = document.cookie.split('.')[1];
        const decodedValue = JSON.parse(atob(cookieValue));
        localStorage.setItem('userId', decodedValue.id);
        // props.toggle();
    }

    function handleEmailInputClick() {
        console.log('test')
        shrinkEmailLabel = true;
    }

    function handleFirstNameInputClick() {
        console.log('test')
        shrinkFirstNameLabel = true;
    }

    function handleOutsideFirstNameClick() {
        console.log('test')
        shrinkFirstNameLabel = false
    }

    function handleLastNameInputClick() {
        console.log('test')
        shrinkLastNameLabel = true;
    }

    function handleOutsideLastNameClick() {
        console.log('test')
        shrinkLastNameLabel = false
    }

    function handlePasswordInputClick() {
        console.log('test')
        shrinkPasswordLabel = true;
    }

    function handleOutsideEmailClick() {
        console.log('test')
        shrinkEmailLabel = false
    }

    function handleOutsidePasswordClick() {
        console.log('test')
        shrinkPasswordLabel = false
    }

    function handleBackButton() {
        email = ''
        initial = true
    }

    async function handleRegistration() {
        try {
            const newUser = await createUser({
                email,
                password,
                firstName,
                lastName
            });
            console.log('Registration successful');
            try {
                await handleLogin()
                console.log('UserLoggedIn');
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleGoogleSignin() {
        window.location.href = 'https://terra-sounds-backend.fly.dev/auth/google';
    }

    function handleSignout() {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        localStorage.removeItem('userId');
        // setLoggedIn(false);
        // props.toggle();
    }

    // onMount(() => {
    //     fetch('https://terra-sounds-backend.fly.dev/auth/google/callback')
    //         .then((response) => {
    //
    //             if (response.ok) {
    //                 return response.json();
    //             } else {
    //                 throw new Error('Not logged in');
    //             }
    //         })
    //         .then((data) => {
    //             // setUserProfile(data);
    //             // setLoggedIn(true);
    //         })
    //         .catch(() => {
    //             // setLoggedIn(false);
    //         })
    // });
    
    
</script>

<div class={initial ? 'popup' : (register ? 'popup-register' : 'popup-login')}>
    <form on:submit|preventDefault>
        {#if initial}
            <div class='header'>
                <h2 class="headerText">Log in or sign up</h2>
            </div>
            <div class='divider'></div>
            <h1 class='welcome'>Welcome to TerraSounds</h1>
            <div class="form-control">
                {#if shrinkEmailLabel || email !== ''}
                    <label class='shrink' in:scale="{{duration:500,start :2.4}}">
                        Email
                    </label>
                {:else}
                    <label in:scale="{{duration:500,start:0}}">
                        Email
                    </label>
                {/if}
                <input on:focusout={handleOutsideEmailClick} on:focusin={handleEmailInputClick} type="text"
                       id="email" bind:value={email}/>
            </div>
            {#if loading}
                <svelte:component this={LoadingIndicator}></svelte:component>
            {:else}
                <button
                        class="continueButton" on:click={handleContinueWithEmail}>Continue
                </button>
            {/if}

            <div class='dividerOr'>
                <div class='dividerLeft'></div>
                <h2 class="Or">Or</h2>
                <div class="dividerRight"></div>
            </div>

            <button class="googleBtn" on:click={handleGoogleSignin}>
                <img src='../../src/avatas/Google_Logo.svg' alt="google logo"
                     width={25} height={25} style={{ marginRight: '10px' }}/>
                Sign in with Google
            </button>
        {:else}

            {#if hasAccount}
                <div class='header'>
                    <h2 class="headerText">Log in</h2>
                </div>
                <div class='divider'></div>
                <div class="form-control">
                    <div class="passwordInput">
                        {#if shrinkPasswordLabel || password !== ''}
                            <label class='shrink' in:scale="{{duration:500,start :2.4}}">
                                Password
                            </label>
                        {:else}
                            <label in:scale="{{duration:500,start:0}}">
                                Password
                            </label>
                        {/if}
                        <input on:focusout={handleOutsidePasswordClick}
                               on:focusin={handlePasswordInputClick} type="text" id="passwordSignup"
                               bind:value={password} required/>
                    </div>
                </div>
                <button class='continueButton' on:click={handleLogin}>Continue</button>
            {:else}
                <div class="header">
                    <h2 class="headerText">Sign up</h2>
                </div>
                <div class='divider'></div>
                <div class="form-control">
                    <div class="signUpDetails">
                        <div class="signUpInput">
                            {#if shrinkFirstNameLabel || firstName !== ''}
                                <label class='shrink' in:scale="{{duration:500,start :2.4}}">
                                    First name
                                </label>
                            {:else}
                                <label in:scale="{{duration:500,start:0}}">
                                    First name
                                </label>
                            {/if}
                            <input on:focusout={handleOutsideFirstNameClick}
                                   on:focusin={handleFirstNameInputClick} type="text" id="FirstName"
                                   bind:value={firstName} required/>
                        </div>
                        <div class="signUpInput">
                            <div class="form-control">
                                {#if shrinkLastNameLabel || lastName !== ''}
                                    <label class='shrink' in:scale="{{duration:500,start :2.4}}">
                                        Last name
                                    </label>
                                {:else}
                                    <label in:scale="{{duration:500,start:0}}">
                                        Last name
                                    </label>
                                {/if}
                                <input on:focusout={handleOutsideLastNameClick}
                                       on:focusin={handleLastNameInputClick} type="text" id="LastName"
                                       bind:value={lastName} required/>
                            </div>
                        </div>
                        <div class="signUpInput">
                            <div class="form-control">
                                {#if shrinkEmailLabel || email !== ''}
                                    <label class='shrink' in:scale="{{duration:500,start :2.4}}">
                                        Email
                                    </label>
                                {:else}
                                    <label in:scale="{{duration:500,start:0}}">
                                        Email
                                    </label>
                                {/if}
                                <input on:focusout={handleOutsideEmailClick} on:focusin={handleEmailInputClick}
                                       type="text"
                                       id="emailSignUp" bind:value={email} required/>
                            </div>
                        </div>
                        <div class="form-control">

                            {#if shrinkPasswordLabel || password !== ''}
                                <label class='shrink' in:scale="{{duration:500,start :2.4}}">
                                    Password
                                </label>
                            {:else}
                                <label in:scale="{{duration:500,start:0}}">
                                    Password
                                </label>
                            {/if}
                            <input on:focusout={handleOutsidePasswordClick}
                                   on:focusin={handlePasswordInputClick} type="text" id="password"
                                   bind:value={password} required/>

                        </div>
                    </div>
                </div>
                <button class='continueButton' on:click={handleRegistration}>Continue</button>
            {/if}
        {/if}
        {#if initial}
            <button class='closeButton' on:click={handleShowLogin}>
                X
            </button>
        {:else}
            <button class='backButton' on:click={handleBackButton}>
                <img width={25} height={25} src='../../src/avatas/backArrow.svg'>
            </button>
        {/if}

    </form>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');

    .passwordInput {
        margin-top: 20px;
    }

    .closeButton {
        position: absolute;
        color: black;
        background: none;
        border: none;
        cursor: pointer;
        top: 15px;
        left: 15px;
    }

    .backButton {
        position: absolute;
        background: none;
        border: none;
        cursor: pointer;
        top: 12px;
        left: 15px;
    }

    .popup {
        position: absolute;
        z-index: 300;
        top: 20vh;
        left: 30vw;
        width: 500px;
        height: 500px;
        background-color: white;
        border-radius: 14px;
    }

    .popup-login {
        position: absolute;
        z-index: 300;
        top: 20vh;
        left: 30vw;
        width: 500px;
        height: 300px;
        background-color: white;
        border-radius: 1vw;
    }

    .signUpInput {
        margin-bottom: 20px;
    }

    .popup-register {
        position: absolute;
        z-index: 300;
        top: 20vh;
        left: 30vw;
        width: 500px;
        height: 500px;
        background-color: white;
        border-radius: 1vw;
    }

    .Or {
        font-size: 15px;
        margin-top: -8px;
        margin-right: -15px;
    }

    .continueButton {
        z-index: 320;
        margin-left: 40px;
        background-color: #f3c2c2;
        width: 425px;
        border: none;
        border-radius: 5px;
        margin-top: 20px;
        height: 55px;
        font-size: 18px;
        color: white;
        cursor: pointer;
    }

    .form-control {
        position: relative;
    }

    .form-control label {
        position: absolute;
        margin-left: 50px;
        margin-top: 20px;
        color: gray;
        transform-origin: top left;
    }

    .signUpDetails {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .shrink {
        transform: scale(0.7);
        transform-origin: top left;
        left: 0px;
        top: -15px;
        padding-bottom: 50px
    }

    .form-control input[type="text"] {
        width: 400px;
        height: 35px;
        padding: 10px;
        border: 2px solid black;
        border-radius: 5px;
        margin-left: 40px;
    }

    .welcome {
        margin-left: 20px;
        font-family: 'Roboto', sans-serif;
    }

    .popup-inner {
        background-color: white;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
        width: 40%;
    }

    .divider {

        width: 100%;
        height: 1px;
        background-color: gray;
        opacity: 30%;
    }

    .dividerOr {
        margin-top: 50px;
        display: flex;
        color: black;
        flex-direction: row;
    }

    .dividerLeft {
        margin-left: 40px;
        margin-right: 20px;
        width: 180px;
        height: 1px;
        background-color: gray;
        opacity: 30%;
    }

    .dividerRight {
        margin-right: 40px;
        width: 180px;
        margin-left: 40px;
        height: 1px;
        background-color: gray;
        opacity: 30%;
    }

    .header {
        display: flex;
        justify-content: space-evenly;
    }

    .headerText {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
    }

    .popup-inner label {
        display: block;
        margin-bottom: 10px;
    }

    .popup-inner input {
        width: 100%;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
    }

    .popup-close {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .popup-close h2 {
        margin: 0 auto;
    }

    /* Button Style for Google Login */

    .googleBtn {
        align-items: center;
        background: #fff;
        border: 1px solid #c2c8d0;
        border-radius: 3px;
        margin-top: 30px;
        color: #2d333a;
        cursor: pointer;
        display: flex;
        font-size: 16px;
        height: 50px;
        outline: 0;
        padding: 0 16px;
        transition: box-shadow .15s ease-in-out, background-color .15s ease-in-out;
        width: 425px;
        margin-left: 40px;
        justify-content: center;
        flex-direction: row;
    }

    .googleBtn:focus {
        background-color: rgba(0, 123, 173, .15);
        box-shadow: 0 0 0 4px rgba(0, 123, 173, .15);
    }

    .googleBtn:hover {
        box-shadow: inset 0 0 0 150px rgba(0, 0, 0, .1);
    }

    .googleBtn:active {
        box-shadow: inset 0 0 0 150px rgba(0, 123, 173, .15);
    }
</style>
