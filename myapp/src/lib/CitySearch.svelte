<script lang="ts">

    import {searchNotLocal} from "../stores/stores";

    let value = '';
</script>


<form>
    <label for="default-search"></label>
    <div class="relative">
        <input bind:value type="search" id="default-search" placeholder="city name" required>
        <button on:click={()=>searchNotLocal(value)} type="submit"><img class='imageButton'
                                                                        src="../../src/avatas/earthButton.png">
        </button>

    </div>
</form>

<style>
    #default-search {
        height: 2.5vw;
    }

    input {
        border-radius: 0.5vw;
    }

    .imageButton {
        width: 3vw;
        color: magenta;
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