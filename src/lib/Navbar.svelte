<script>
    import Search from "./Search.svelte";
import { viewMode } from "./Store";
    const setViewMode = mode => {
        return (() => {
            viewMode.set(mode);
        })
    };
</script>

<nav>
    <div class="btns-view">
        <button on:click={setViewMode('grid')} class="btn">
            <i class="fa fa-th-large" aria-hidden="true"></i>
            <span>Grid view</span>
        </button>
        
         <button on:click={setViewMode('table')} class="btn">
            <i class="fa fa-table" aria-hidden="true"></i>
            <span>Table view</span>
         </button>    
    </div>
    <Search />
</nav>

<style>
    nav {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .btns-view {
        margin-top: 40px;
        margin-bottom: 40px;
    }
    /* .active {
        background-color: blue;
    } */
</style>
