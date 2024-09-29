// Add your Google Sheets URL here
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRC5CFRdn14slaGyvOfXi77KPrsCBwIRRftk0UOI-1MOZIW2p_2c1lngfYUgO8fmqeuLewjPDYrm4jT/pubhtml';

function init() {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: showInfo,
        simpleSheet: true
    });
}

function showInfo(data) {
    var productList = document.getElementById('product-list');
    
    data.forEach(function(product) {
        // Create product card
        var productCard = document.createElement('div');
        productCard.classList.add('product-item');

        // Product image
        var img = document.createElement('img');
        img.src = product['Image URL'];
        productCard.appendChild(img);

        // SKU
        var sku = document.createElement('p');
        sku.classList.add('sku');
        sku.innerText = 'SKU: ' + product.SKU;
        productCard.appendChild(sku);

        // Product name
        var productName = document.createElement('h2');
        productName.innerText = product['Product Name'];
        productCard.appendChild(productName);

        // Product price
        var price = document.createElement('p');
        price.innerText = 'Price: $' + product.Price;
        productCard.appendChild(price);

        // Stock availability
        var stockInfo = document.createElement('p');
        stockInfo.innerText = product.Stock > 0 ? 'In Stock: ' + product.Stock : 'Out of Stock';
        if (product.Stock <= 0) {
            stockInfo.classList.add('out-of-stock');
        }
        productCard.appendChild(stockInfo);

        // Buy button
        if (product.Stock > 0) {
            var buyBtn = document.createElement('a');
            buyBtn.classList.add('buy-btn');
            buyBtn.innerText = 'Buy Now';
            buyBtn.href = '#';  // You can replace with actual checkout links
            productCard.appendChild(buyBtn);
        }

        // Append the card to product list
        productList.appendChild(productCard);
    });
}

// Start the script
window.addEventListener('DOMContentLoaded', init);
