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

<div class="card" title={title}>
    <h2>{title}</h2>
    <h3>{brand}</h3>
    <div class="img-section">
        <button on:click={clickImgLeft} class='arrow' disabled={!(images.length > 1)}>{`<`}</button>
        <img src={images[index]} alt={description} >
        <button on:click={clickImgRight} class='arrow' disabled={!(images.length > 1)}>{`>`}</button>
    </div>
    <p>{description}</p>
    <button on:click={() => seeMore = !seeMore}>See {seeMore ? 'less' : 'more'}</button>
    <div class='{`info ${seeMore ? 'info-open' : ''}`}'>
        {#if seeMore}
            <p>$ {price}</p>
            <p>Rating: {rating}</p>
        {/if}
    </div>        
</div>

<style>
    .card { 
        width: 300px;
        margin: 10px;
    }
    div {
        outline: 1px dotted blue;
    }
    .img-section {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .arrow {
        cursor: pointer;
    }
    img {
        object-fit: contain;
        width: 250px;
        height: 250px;
    }
    .info {
        max-height: 0%;
        transition: max-height 2s;
    }
    .info-open {
        max-height: 100%;
    }

</style>
