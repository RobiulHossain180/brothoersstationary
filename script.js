var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRC5CFRdn14slaGyvOfXi77KPrsCBwIRRftk0UOI-1MOZIW2p_2c1lngfYUgO8fmqeuLewjPDYrm4jT/pubhtml';

// Load the Google Visualization API
function loadSheet() {
    var query = new google.visualization.Query(publicSpreadsheetUrl);
    query.send(handleData);
}

// Callback function to handle the data
function handleData(response) {
    if (response.isError()) {
        console.log('Error fetching data: ' + response.getMessage());
        return;
    }
    
    var data = response.getDataTable();
    var productList = document.getElementById('product-list');

    for (var i = 0; i < data.getNumberOfRows(); i++) {
        var productCard = document.createElement('div');
        productCard.classList.add('product-item');
        
        // Get product details from the sheet
        var imageUrl = data.getValue(i, 0);  // Assumes the Image URL is in the first column
        var sku = data.getValue(i, 1);       // SKU in the second column
        var productName = data.getValue(i, 2); // Product name in the third column
        var price = data.getValue(i, 3);     // Price in the fourth column
        var stock = data.getValue(i, 4);     // Stock in the fifth column

        // Product Image
        var img = document.createElement('img');
        img.src = imageUrl;
        productCard.appendChild(img);

        // SKU
        var skuElement = document.createElement('p');
        skuElement.classList.add('sku');
        skuElement.innerText = 'SKU: ' + sku;
        productCard.appendChild(skuElement);

        // Product Name
        var productNameElement = document.createElement('h2');
        productNameElement.innerText = productName;
        productCard.appendChild(productNameElement);

        // Product Price
        var priceElement = document.createElement('p');
        priceElement.innerText = 'Price: $' + price;
        productCard.appendChild(priceElement);

        // Stock Information
        var stockInfo = document.createElement('p');
        stockInfo.innerText = stock > 0 ? 'In Stock: ' + stock : 'Out of Stock';
        if (stock <= 0) {
            stockInfo.classList.add('out-of-stock');
        }
        productCard.appendChild(stockInfo);

        // Buy button
        if (stock > 0) {
            var buyBtn = document.createElement('a');
            buyBtn.classList.add('buy-btn');
            buyBtn.innerText = 'Buy Now';
            buyBtn.href = '#';  // Replace with actual checkout links
            productCard.appendChild(buyBtn);
        }

        // Append the card to product list
        productList.appendChild(productCard);
    }
}

// Load the Google Visualization library and set a callback
google.charts.load('current', { packages: ['corechart', 'table'] });
google.charts.setOnLoadCallback(loadSheet);
