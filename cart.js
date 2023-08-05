var containerDiv = document.getElementById("products");
var footer = document.getElementsByClassName(".footer .row")[0];

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://dummyjson.com/products");
xhr.send();
xhr.addEventListener("readystatechange", function () {

    if (xhr.readyState == 4 && xhr.status == 200) {
        var resJSON = xhr.response;
        var response = JSON.parse(resJSON);
        var products = response.products;

        var getItems = JSON.parse(localStorage.getItem("cart number"));
        // console.log(getItems);
        // console.log(typeof getItems);
        var single_product;
        //console.log("get item=>"+getItems);
        var arrItems = [];
        for (let i = 0; i < getItems.length; i++) {
            single_product = products.find(ele =>{
                return ele.id == getItems[i]
            })
            // console.log(single_product);
            arrItems.push(single_product);
        };
        // console.log(arrItems);

        for (let i = 0; i < arrItems.length; i++) {
            var img = arrItems[i].thumbnail;
            var title = arrItems[i].title;
            var price = arrItems[i].price;
            var id = arrItems[i].id;

            show(id, title, price, img);
        }
        function show(id, title, price, img) {


            return containerDiv.innerHTML += `
                <div class="table">
                    <div class="header">
                        <div class="row">
                           <div class="cell"> <h3>Product</h3> </div>
                           <div class="cell"></div>
                           <div class="cell"> <h3>Price</h3> </div>
                           <div class="cell"> <h3>Quantity</h3> </div>
                           <div class="cell"></div>
                        </div>
                    </div>
                    <div class="body">
                        <div class="row">
                             <div class="cell"><img src=${img} class="image"> <span class="product-title">${title} </span> </div>
                             <div class="cell"></div>
                             <div class="cell" id="product-price${price}">${price} $ </div>
                             <div class="cell">
                                <input type="button" onclick="decrement(${id},${price})" value="-" />
                                <input type="text" value="1" maxlength="2" max="10" size="1" id="number${id}" readonly/>
                                <input type="button" onclick="increment(${id},${price})" value="+" />
                             </div>
                        <div class="cell">
                        <button class="remove-btn" onclick="RemoveItem(${id})">Remove</button>
                        </div>
                        </div>
                    </div>
                </div> <hr>`;

        };
    };

});

//Reloading the page (Without this function, the span will be 0 regardless the items saved in local storage)
let shoppingIcon = document.querySelectorAll(".shopp-cart span")[0];
function onLoadCartNumbers() {
    let items = JSON.parse(localStorage.getItem("cart number"));
    if (items) {
        shoppingIcon.innerHTML = items.length;
    };

};
onLoadCartNumbers();

function increment(id, price) {
    // console.log(id);
    // console.log(price)
    var value = parseInt(document.getElementById("number" + id).value);
    // console.log(value);
    if (value < 10) {
        value++;
        document.getElementById("number" + id).value= value;
        var p= price*value;
        // console.log(p)
    }
    var productPrice= document.getElementById("product-price"+ price);
    productPrice.innerHTML= p + " $"

}
function decrement(id, price) {
    //console.log(id);
    var value = parseInt(document.getElementById("number" + id).value);
    // console.log(value);

    if (value > 1) {
        value--;
    document.getElementById("number" + id).value= value;
    var p= price*value;
    // console.log(p)
    }
    var productPrice= document.getElementById("product-price"+ price);
    productPrice.innerHTML= p + " $"
}
function RemoveItem(id) {
    // console.log("hhhhhhhhhhhhhhhhhhh");
    let index = -1;
    let items = JSON.parse(localStorage.getItem("cart number"));
    console.log(items);
    for (let i = 0; i < items.length; i++) {
        if (id === items[i]) {
            index = i
        }
    }
    items.splice(index, 1);
    localStorage.setItem("cart number", JSON.stringify(items));
    console.log(items);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://dummyjson.com/products");
    xhr.send();
    xhr.addEventListener("readystatechange", function () {

        if (xhr.readyState == 4 && xhr.status == 200) {
            document.body.remove();

            var resJSON = xhr.response;
            var response = JSON.parse(resJSON);
            var products = response.products;
            console.log(products);
            var getItems = JSON.parse(localStorage.getItem("cart number"));
            // console.log(getItems);
            // console.log(typeof getItems);
            var allProducts;
            //console.log("get item=>"+getItems);
            arrItems = [];
            for (let i = 0; i < getItems.length; i++) {
                allProducts = products.find(ele => {
                    return ele.id == getItems[i];
                });
                // console.log(allProducts);
                arrItems.push(allProducts);
            };
            for (let i = 0; i < arrItems.length; i++) {
                var img = arrItems[i].thumbnail;
                var title = arrItems[i].title;
                var price = arrItems[i].price;
                var id = arrItems[i].id;

                show(id, title, price, img);
            }
            function show(id, title, price, img) {


                return containerDiv.innerHTML += `
                            <div class="table">
                                <div class="header">
                                    <div class="row">
                                       <div class="cell"> <h3>Product</h3> </div>
                                       <div class="cell"></div>
                                       <div class="cell"> <h3>Price</h3> </div>
                                       <div class="cell"> <h3>Quantity</h3> </div>
                                       <div class="cell"></div>
                                    </div>
                                </div>
                                <div class="body">
                                    <div class="row">
                                         <div class="cell"><img src=${img} class="image"> <span class="product-title">${title} </span> </div>
                                         <div class="cell"></div>
                                         <div class="cell">${price} $ </div>
                                         <div class="cell">
                                            <input type="button" onclick="decrement(${id})" value="-" />
                                            <input class="quantity" type="text" name="quantity" value="1" maxlength="2" max="10" size="1" id="number${id}" readonly/>
                                            <input type="button" onclick="increment(${id})" value="+" />
                                         </div>
                                    <div class="cell">
                                    <button class="remove-btn" onclick="RemoveItem(${id})">Remove</button>
                                    </div>
                                    </div>
                                </div>
                            </div> <hr>`;

            }
        }
    });
    location.reload();
}