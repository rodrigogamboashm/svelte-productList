<script>
  import { productList } from "./Store";
  import { viewMode } from "./Store";
  import { searchActive } from "./Store";
  import Card from "./Card.svelte";
  import TableCard from "./TableCard.svelte";
  import { loadingData } from "./Store";
  let sortAsc = false;

  fetch('https://dummyjson.com/products/')
    .then(res => res.json())
    .then(data => {
      productList.set(data.products);
    })
    .finally(() => {
      loadingData.set(false);
    });

  const order = (orderBy, orderMode) => {
    return(() => {
      sortAsc = !sortAsc;
      if (orderMode === 'string') {
        productList.set(
          $productList.sort((a, b) => {
            const nameA = a[orderBy].toLowerCase();
            const nameB = b[orderBy].toLowerCase();
            if (nameA < nameB) {
              return sortAsc ? -1 : 1;
            }
            if (nameA > nameB) {
              return sortAsc ? 1 : -1;
            }
            return 0;
          })
        );  
      }
      if (orderMode === 'number') {
        productList.set(
          $productList.sort((a, b) => 
            sortAsc ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy])
        );
      }
    });
  };

  let headers = [
    { title: '' },                                              // images[]
    { title: 'Name', sortBy: 'title', sortMode: 'string' },     // title
    { title: 'Brand', sortBy: 'brand', sortMode: 'string' },    // brand
    { title: 'Description' },                                   // description
    { title: 'Price', sortBy: 'price', sortMode: 'number' },    // price
    { title: 'Rating', sortBy: 'rating', sortMode: 'number' },  // rating
  ];
</script>

<div class="container">
  {#if $loadingData}
    <p>Loading...</p>
  {:else}
    <p>{$productList.length} result{$productList.length !== 1 ? 's' : ''}</p>
    {#if $searchActive.length}
      <p>&nbsp;for "{$searchActive}"</p>
    {/if}

    {#if $productList.length}
      {#if $viewMode==='grid'}
        {#each $productList as productInfo}
          <div>
            <Card {...productInfo} />
          </div>
        {/each}
      {/if}

      {#if $viewMode==='table'}
        <table>
          <tr>
            {#each headers as header}
              <th>
                {#if header.sortBy}
                  <button on:click={order(header.sortBy, header.sortMode)}>
                    {header.title}
                  </button>              
                {:else}
                  <span>{header.title}</span>
                {/if}
              </th>
            {/each}
          </tr>
          {#each $productList as productInfo}
            <TableCard {...productInfo} />
          {/each}
        </table>
      {/if}
    {/if}
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  table {
    border-collapse: collapse;
  }
  th {
    background-color: #dadad9;
  }
</style>