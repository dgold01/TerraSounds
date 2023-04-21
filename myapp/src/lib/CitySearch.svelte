<script lang="ts">
    import {Button, Search} from 'flowbite-svelte';
    export let handleSearchClick;
    let value = '';
</script>


<form>
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
    <div class="relative">
        <input bind:value type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="city name" required>
        <button on:click={handleSearchClick(value)} type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

<style>
    .search-wrapper {
        position: relative;
    }

    .fb-search-input {
        border-radius: 50px;
        border: none;
        background-color: #1c1c1c;
        color: #fff;
        padding: 0.5rem 1.5rem;
        font-size: 1.2rem;
        width: 300px;
    }

    .fb-search-button {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        border: none;
        background-color: #1c1c1c;
        color: #fff;
        padding: 0.5rem 1.5rem;
        font-size: 1.2rem;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        cursor: pointer;
    }

    .fb-search-button:hover {
        background-color: #333;
    }

    .fb-search-button:focus {
        outline: none;
    }

    .search-icon {
        display: none;
    }
</style>