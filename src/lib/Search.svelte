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

<div class="input-group">
    <input type="text" class="form-control" bind:value={inputSearch} placeholder="Search">
    {#if inputSearch.length}
        <button on:click={clearInput} class="btn btn-clear">x</button>
    {/if}
    <div class="input-group-append">
        <button on:click={search(inputSearch)} class="btn" type="button" disabled={!inputSearch}  title="Search by name or description">Search</button>
        <button on:click={search('')} class="btn">Reset</button>
    </div>
</div>

<style>
    .input-group {
        width: auto;
    }
    input {
        max-width: 300px;
    }
    .btn-clear {
        position: absolute;
        right: 140px;
        z-index: 10;
        margin: none;
        background-color: transparent;
        border-radius: 50%;
    }
    .btn-clear:hover {
        background: var(--light);
    }
</style>
