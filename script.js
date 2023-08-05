var products, item, img, title, description, price, clickedItem, clickedProduct;
var containerDiv = document.getElementById("products");

function sendRequest(params) {
    // 1- XMLHttpRequest --> obj
    var xhr = new XMLHttpRequest();

    // 2- send request :(Method , URL)
    xhr.open("GET", "https://dummyjson.com/products");
    xhr.send();
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // 3- get response
            var resJSON = xhr.response;
            // 4-display
            // 4-convert JSON into JS obj
            var response = JSON.parse(resJSON);
            let products = response.products;
            // console.log(products);
            for (let index = 0; index < products.length; index++) {
                var img = products[index].thumbnail;
                var title = products[index].title;
                var price = products[index].price;
                containerDiv.innerHTML += `<div class="product"> 
                <img src=${img} class="image"> 
                <h1 class="product-title">${title}</h1> 
                <p class="product-price-container">${price}</p>
                <button class="add-to-cart" onclick="addToCart(${products[index].id}, this)"><div class="addtocart-div"><h3>Add to Cart</h3></div></button> 
                </div>`;
                   //Appending the products titles to the dropdown search list 
                   let searchList = document.getElementById("searchList")//Parent element
                   item = document.createElement('li');
                   item.textContent = title
                   searchList.appendChild(item);
   
                   //Getting the data of a product into another window, when clicking on it.
                     var allp = document.querySelectorAll("h1");

                for (let i = 0; i < allp.length; i++) {

                    allp[i].addEventListener("click", openWin);

                }
                   item.addEventListener("click", openWin);
                   function openWin(event){
                       newWin = window.open("productWin.html", "_blank");
                       clickedItem = event.target.textContent
                       console.log(clickedItem)
                      
   
                   clickedProduct = products.filter(function(product){
                       return product.title == clickedItem;  
                   }) 
                   localStorage.setItem("id", clickedProduct[0].id)
                   localStorage.setItem("img", clickedProduct[0].images)
                   console.log (clickedProduct)
               }
                   item.style.display = "none"
                   document.getElementById("searchList").style.background="none"
            }
        }
    })
}
sendRequest();
//function to search
let input, filter, a, div, i, txtValue, searchedList;
var searchBtn = document.getElementById("searchBtn");

function filterFunction() {
    
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("searchList");
    a = div.getElementsByTagName("li");

    //console.log(filter)
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 && filter != "") {
            a[i].style.display = ""; 
            div.style.backgroundColor="white";
            
              searchedList = sessionStorage.setItem("productTitle",a[i].textContent);
              console.log (searchedList)
        }
        else {
            a[i].style.display = "none";
           // div.style.background="none"
        }

        if (input.value == ""){
            div.style.background="none"
        }
    }
    // searchBtn.addEventListener("click", function (){
    //     console.log(div)
    // }) 
}



let arr = [];

function addToCart(id, ele) {

    if (JSON.parse(localStorage.getItem("cart number")) == null) {
        arr.push(id);
        localStorage.setItem("cart number", JSON.stringify(arr))
    }
    var checkId = JSON.parse(localStorage.getItem("cart number")).find(function (e) {
        
        return id == e;
    });
    // console.log(checkId)
    
    if (arr.length === 0) {
        arr = JSON.parse(localStorage.getItem("cart number"));
    }
    if (checkId == undefined) {
        // alert("undefined")
        arr.push(id);
        localStorage.setItem("cart number", JSON.stringify(arr))
    }
    else {
        alert("this product already in the cart");
    }
    // console.log(id,ele);

    let items = JSON.parse(localStorage.getItem("cart number"));
    shoppingIcon.innerHTML = items.length;
    ele.setAttribute("disabled", "disabled");
}

//Reloading the page (Without this function, the span will be 0 regardless the items saved in local storage)
let shoppingIcon = document.querySelectorAll(".shopp-cart span")[0];

function onLoadCartNumbers() {
    let items = JSON.parse(localStorage.getItem("cart number"));
    if (items) {
        shoppingIcon.innerHTML = items.length;
    };
};
onLoadCartNumbers();