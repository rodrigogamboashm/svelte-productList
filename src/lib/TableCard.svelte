<script>
    export let title;
    export let brand;
    export let images;
    export let description;
    export let price;
    export let rating;
    let index = 0;

    // const clickImgLeft = () => {
    //     index--;
    //     index = index < 0 ? images.length - 1 : index;
    // }

    // const clickImgRight = () => {
    //     index++;
    //     index = index > images.length - 1 ? 0 : index;
    // }
</script>

<tr>
    <td class="img-container">
        <!-- <button on:click={clickImgLeft}></button> -->
        <img src={images[index]} class="img-fluid" alt="">
        <!-- <button on:click={clickImgRight}></button> -->
    </td>
    <td>{title}</td>
    <td>{brand}</td>
    <td>{description}</td>
    <td>{price}</td>
    <td>{rating}</td>
</tr>

<style>
    tr {
        height: 100px;
    }
    .img-container {
        display: flex;
    }
    img {
        object-fit: contain;
        max-height: 100px;
        overflow: hidden;
    }
</style>
