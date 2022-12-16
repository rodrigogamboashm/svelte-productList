<script>
  import Card from "./Card.svelte";
  import TableCard from "./TableCard.svelte";
  import { loadingData } from "./Store";
  import { productList } from "./Store";  
  import { searchActive } from "./Store";
  import { viewMode } from "./Store";
  
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
    <div class="result-text">
      <p>{$productList.length} result{$productList.length !== 1 ? 's' : ''}</p>
      {#if $searchActive.length}
        <p>&nbsp;for "{$searchActive}"</p>
      {/if}
    </div>
    {#if $productList.length}
      {#if $viewMode==='grid'}
        <div class="card-columns">
        {#each $productList as productInfo}
            <Card {...productInfo} />
        {/each}
      </div>
      {/if}

      {#if $viewMode==='table'}
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              {#each headers as header}
                <th>
                  {#if header.sortBy}
                    <button on:click={order(header.sortBy, header.sortMode)} class="btn-sort">
                      <span>{header.title}</span>
                      <i class="fa fa-sort" aria-hidden="true"></i>  
                    </button>                    
                  {:else}
                    <span>{header.title}</span>
                  {/if}
                </th>
              {/each}
            </tr>  
          </thead>
          <tbody>
            {#each $productList as productInfo}
              <TableCard {...productInfo} />
            {/each}  
          </tbody>
        </table>
      {/if}
    {/if}
  {/if}
</div>

<style>
  .result-text {
    display: flex;
    justify-content: flex-end;
  }
  .btn-sort {
    color: #fff;
    font-weight: bold;
    background-color: transparent;
    box-shadow: none;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    margin: 0;
    padding: 0;
  }
  .btn-sort span {
    margin-right: 10px;
  }
</style>