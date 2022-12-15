<script>
    import { viewMode } from "./Store";
    const setViewMode = mode => {
        return (() => {
            viewMode.set(mode);
        })
    };
</script>

<button on:click={setViewMode('grid')}>
    List
</button>
 <button on:click={setViewMode('table')}>
    Table
 </button>