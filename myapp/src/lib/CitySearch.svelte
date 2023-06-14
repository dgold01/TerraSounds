<script lang="ts">

    let searchNotLocal

    let value = '';

    async function loadSearchNotLocal() {
        const module = await import ('./routingFunctions/routingFunctions')
        searchNotLocal = module.searchNotLocal
    }

</script>
<div class="container">
    <form>
        <div>
            <input bind:value type="search" id="default-search" placeholder="City name" required>

            <button on:click={async ()=>{ await loadSearchNotLocal(); searchNotLocal(value)}} type="submit"><img
                    class='imageButton' src="../../src/avatas/earthButton.png">
            </button>
        </div>
    </form>
</div>

<style>
    #default-search {
        height: 2.5vw;
        border-style: solid;
        border-color: black;

    }

    input {
        padding-left: 10px;
        border-radius: 2vw;
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