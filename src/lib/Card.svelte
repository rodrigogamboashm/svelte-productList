<script>
    export let title;
    export let brand;
    export let images;
    export let description;
    export let price;
    export let rating;
    let index = 0;
    let seeMore = false;

    const clickImgLeft = () => {
        index--;
        index = index < 0 ? images.length - 1 : index;
    }

    const clickImgRight = () => {
        index++;
        index = index > images.length - 1 ? 0 : index;
    }
</script>

<div class="card text-white bg-dark mb-3" title={title}>
    <div class="card-header">{brand}</div>
    <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{description}</p>
    </div>
    <div class="img-section">
        <!-- <button on:click={clickImgLeft} class='arrow' disabled={!(images.length > 1)}>{`<`}</button> -->
        <img class="card-img-top" src={images[index]} alt={description} >
        <!-- <button on:click={clickImgRight} class='arrow' disabled={!(images.length > 1)}>{`>`}</button> -->
    </div>
    <div class="card-body">
        <p class="card-text">
            <span>$ {price}</span>
            <span>Rating: {rating}</span>
        </p>
    </div>
    
    <!-- <button on:click={() => seeMore = !seeMore}>See {seeMore ? 'less' : 'more'}</button> -->
    <div class='{`info ${seeMore ? 'info-open' : ''}`}'>
        {#if seeMore}
            <p>$ {price}</p>
            <p>Rating: {rating}</p>
        {/if}
    </div>        
</div>

<style>
    .img-section {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-text {
        display: flex;
        justify-content: space-between;
    }
</style>
