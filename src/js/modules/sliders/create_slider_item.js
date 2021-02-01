function create_slider_item(obj) {
    let {
        name,
        id,
        img,
        pricenew,
        priceold,
        happeningWithProduct
    } = obj;

    let item = document.createElement('div');
    item.classList.add('slider_hits_item');
    item.setAttribute('data-product-IDURL', id);
    if (happeningWithProduct == 'акция') {
        item.classList.add('_stock_sell');
    }
    if (happeningWithProduct == 'новинка') {
        item.classList.add('_new_sell');
    }
    if (happeningWithProduct == 'хит') {
        item.classList.add('_hit_sell');
    }

    item.innerHTML =
        `<div class="slider_hits_item-kvadro">
                <div class="slider_hits_item-kvadro-text">${happeningWithProduct}</div>
            </div>
            <div class="slider_hits_item-img _ibg_"><img src="${img}"
                    alt="">
            </div>
            <div class="slider_hits_item-title">${name}</div>
            <div class="slider_hits_item-price_row">
                <div class="slider_hits_item-price_old">${priceold}</div>
                <div class="slider_hits_item-price_new">${pricenew}</div>
            </div>
            <object>
                <a href="#" class="slider_hits_item-link _buy_product">
                    <img src="./img/icons/corzina.svg" alt="">
                    <span>КУПИТЬ</span>
                    <div class="slider_hits_item-link slider_hits_item-link-onHover">
                        <img src="./img/icons/cozinablack.png" alt="">
                        <span>КУПИТЬ</span>
                    </div>
                </a>
            </object>
            <object>
                <a href="#" class="slider_hits_item-compare">
                    <div class="slider_hits_item-compare-icon"><img src="./img/icons/vesi.png"
                            alt="">
                    </div>
                    <span>Добавить к сравнению</span>
                </a>
            </object>`;
    return item;
}
export default create_slider_item;