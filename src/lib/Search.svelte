<script>
    import { productList } from "./Store";
    import { searchActive } from "./Store";
    import { loadingData } from "./Store";
    let inputSearch = '';
    
    const search = search => {        
        return (() => {
            loadingData.set(true);
            searchActive.set(search);
            fetch(`https://dummyjson.com/products/search?q=${search}`)
                .then(res => res.json())
                .then(data => {
                    productList.set(data.products);
                })
                .finally(() => {
                    loadingData.set(false);
                });
        });
    };

    const clearInput = () => {
        inputSearch = '';
    }
</script>

<div>
    <input type="text" bind:value={inputSearch} placeholder="Search">
    {#if inputSearch.length}
        <button on:click={clearInput} class="btn-clear">x</button>
    {/if}
    <button disabled={!inputSearch} on:click={search(inputSearch)} class="btn-search" title="Search by name or description">Search</button>    
    <button on:click={search('')}>Reset</button>
</div>

<style>
    input {
        border-radius: 40px 0 0 40px;
        border: 1px solid #ccc;
        height: 40px;
    }
    .btn-search {
        border-radius: 0 40px 40px 0;
    }
    .btn-clear {
        position: relative;
        right: 50px;
        background-color: transparent;
        padding: 0;
        margin: 0;
    }
    .btn-clear:hover {
        border: none;
        border-radius: 50px;
        background-color: #dadada;
    }
    .btn-clear:focus {
        border: none;
    }
</style>

