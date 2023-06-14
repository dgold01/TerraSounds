<script lang="ts">


    let value = '';


</script>
<form class="form">
   
    <div class="relative">
        <div class="search-wrapper">
            <img class="search-icon" src='../../src/avatas/search-icon.png'>
            <input bind:value type="search" id="default-search" placeholder="Find you event" required>
        </div>
        <button on:click={async ()=>{console.log('t')}} type="submit">
        </button>

    </div>
</form>

<style>
    #default-search {
        height: 2.5vw;
        border-style: solid;
        border-color: black;

    }
    .search-icon{
        position: absolute;
        width: 1.5vw;
        padding-left: 10px;
        padding-top: 8px;
        
    }
    .form{
        position: absolute;
        margin-top: 30px;
        margin-left: 100px;
    }
    input {
        padding-left: 40px;
        border-radius: 2vw;
    }


    button {

        position: absolute;
        padding-right: 2vw;
        margin-top: -0.3vw;
        border: none;
        background: none;


        cursor: pointer;
    }

</style>