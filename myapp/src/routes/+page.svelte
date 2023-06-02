<script lang="ts">
    import HomePage from "../lib/HomePage.svelte";
    import {goto} from '$app/navigation';
    import {getUsers} from "../lib/ApiServices/usersApiService";
    import {setContext} from 'svelte'

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


<HomePage {showSearch} {chooseCityHandleClick}></HomePage>
