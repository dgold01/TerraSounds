<script lang="ts">
    import HomePage from "../lib/HomePage.svelte";
    import Login from "../lib/Login.svelte";
    import {goto} from '$app/navigation';
    import {getUsers} from "../lib/ApiServices/usersApiService";
    import {setContext} from 'svelte'
    let showLogin = false;
    let showSearch = false;

    // let userId


    // setContext('handleSignIn',handleSignIn)

    // setContext('showSignUp',showSignUp)
    // setContext('showSignIn',showSignIn)


    // async function handleSignIn(email) {
    //     let users = []
    //     users = await getUsers()
    //     users.forEach((user)=>{
    //         if (user.email === email) userId = user._id
    //     })
    //     if(!userId) return console.log('no email found')
    // 
    //     $signedInStore = true
    //     showLoginPage = false;
    //     showSignUpPage = false;
    //     showHomePage = true
    //    
    // }

    function chooseCityHandleClick() {
        showSearch = true
    }
    function handleShowLogin(){
        showLogin = !showLogin;
    }

</script>
<style>
    /*.map-container {*/
    /*    overflow: hidden;*/
    /*}*/
</style>

<!--{if showLoginPage}-->
<!--    <LoginPage ></LoginPage>-->
<!--{:else if showSignUpPage}-->
<!--    <SignUpPage  ></SignUpPage>-->


<HomePage {showSearch} {handleShowLogin} {chooseCityHandleClick}></HomePage>
{#if showLogin}
    <Login {handleShowLogin}></Login>
{/if}