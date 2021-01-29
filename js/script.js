// display menu ----------------------------------------------------------------------------------------
let displayMenuIndex = 1;
function displayMenu() {
    let catalog_menu = document.getElementById('catalog_menu');
    if (displayMenuIndex % 2 == 0) {
        catalog_menu.style.display = 'none'
    }
    else {
        catalog_menu.style.display = 'block'
    }
    displayMenuIndex += 1
}

// display menu ______END-------------------------------------------------------------------------------

// scroll function--------------------------------------------------------------------------------------
window.onscroll = function(){
    scrollFunction()
};

var header = document.getElementById("fixedHeader");
var sticky = header.offsetTop;
var catalogHead = document.getElementById("catalog_head");
var cartContent = document.getElementById("cartContent");

var CatalogMenu = document.getElementById("catalog_menu");
var scrollMenu = CatalogMenu.offsetTop;

function scrollFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("page_head2_scroll");
        catalogHead.classList.add("catalog_scroll");
        cartContent.style.top = '50px';
    } 
    else {
        header.classList.remove("page_head2_scroll");
        catalogHead.classList.remove("catalog_scroll");
        cartContent.style.top = '130px';
    }  
    if (displayMenuIndex % 2 != 0){
        if (window.pageYOffset > scrollMenu) {
            CatalogMenu.classList.add("menu_scroll");
        } 
        else {
            CatalogMenu.classList.remove("menu_scroll");
        }  
    }
}
// scroll function____END-------------------------------------------------------------------------------

// slideshow--------------------------------------------------------------------------------------------
let slideIndex = 1;
let interval = setInterval(() => showSlides(slideIndex++), 3000);
showSlides(slideIndex);

function plusSlides(n = 1) {
    //if (interval) clearInterval(interval)
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = Array.from(document.getElementsByClassName('slideshow_img'));

    if (n < 1) slideIndex = slides.length;
    if (n >= slides.length) slideIndex = 1;
    slides.forEach(el => el.style.display = 'none');
    slides[slideIndex - 1].style.display = 'block';
}
// slideshoe____END------------------------------------------------------------------------------------

// filters----------------------------------------------------------------------------------------------
//search bar
function searchBarFunc(){
    var products = document.getElementsByClassName('product_item')
    var productsToPag = [];

    // we will search in titles
    var titles = document.getElementsByClassName('product_title');
    var input = document.getElementById('search_box');
    var filterValue = input.value.toUpperCase();

    if (filterValue == '') {
        pag (4, products)
    }
    else {
        for (let i=0; i<titles.length; i++){
            if (titles[i].innerHTML.toUpperCase().indexOf(filterValue) > -1){
                productsToPag.push(products[i])
            }
        }
        if (productsToPag != []){
            pag (4, productsToPag)
        }
    }
}


function insertAfter (elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

document.getElementById('sort-asc').onclick = function() {
    mySort('price');
}
function mySort(sortType) {
    let nav = document.querySelector('#new_products');
    for (let i=0; i<nav.children.length; i++) {
        for (let j=i; j<nav.children.length; j++){
            if (+nav.children[i].getAttribute(sortType) > +nav.children[j].getAttribute(sortType)) {
                replaceNode = nav.replaceChild(nav.children[j], nav.children[i]);
                insertAfter(replaceNode, nav.children[i]);
            }
        }
    }
    // cartFunction ()
    pag(4, nav.children);
}

document.getElementById('sort-desc').onclick = function() {
    mySortDesc('price');
}
function mySortDesc(sortType) {
    let nav = document.querySelector('#new_products');
    for (let i=0; i<nav.children.length; i++) {
        for (let j=i; j<nav.children.length; j++){
            if (+nav.children[i].getAttribute(sortType) < +nav.children[j].getAttribute(sortType)) {
                replaceNode = nav.replaceChild(nav.children[j], nav.children[i]);
                insertAfter(replaceNode, nav.children[i]);
            }
        }
    }
    // cartFunction ()
    pag(4, nav.children);
}
// filter___END---------------------------------------------------------------------------------------------

//cart-----------------------------------------------------------------------------------------------

// hover effect to display cart
let mainCart = document.getElementById('mainCart')
mainCart.onmousemove = function(){
    cartContent.style.display = 'initial'
};

cartContent.onmouseleave = function(){
    cartContent.style.display = 'none'
};
// hover effect to display cart____END    

let productAvailability = document.querySelectorAll('.product_item_availability');
let carts = document.querySelectorAll('.add_to_cart');
    // style to add to cart button
    for (i=0; i<productAvailability.length; i++){
        if (productAvailability[i].innerHTML == 'Нет в наличии') {
            productAvailability[i].style.color = 'grey';
            carts[i].style.background = 'grey';
        }
    }
    // style to add to cart button___END
let products = [];
function cartFunction (){
    //create an array of products
    let productCode = document.querySelectorAll('.code');
    let productBrand = document.querySelectorAll('.brand');
    let productTitle = document.querySelectorAll('.product_title');
    let productImg = document.querySelectorAll('.product_img');
    let productDescription = document.querySelectorAll('.product_description');
    let productPrice = document.querySelectorAll('.product_item_price');
    let productAvailability = document.querySelectorAll('.product_item_availability');
    let carts = document.querySelectorAll('.add_to_cart');

    for (i=0; i < carts.length; i++){
        products.push({
            code : productCode[i].innerHTML,
            brand : productBrand[i].innerHTML,
            title : productTitle[i].innerHTML,
            img : productImg[i].src,
            description : productDescription[i].innerHTML,
            price : productPrice[i].innerHTML,
            availability : productAvailability[i].innerHTML,
            inCart : 0 
        });
    }
    //create an array of products____END

    //Events on click
    for (let i=0; i < carts.length; i++) {
        if ( productAvailability[i].innerHTML == 'Есть в наличии') {
            carts[i].addEventListener('click', () => {
                cartNumbers(products[i]);
                totalCost(products[i]);
                displayCart();
            })
        }
    }
    //Events on click_____END
    onLoadCartNumbers()
}

function onLoadCartNumbers(){
    //show total number of items inside cart
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.number_of_items').textContent = productNumbers;
    }
    deleteProduct();
}

function cartNumbers(product) {
    //update number of items when adding new item
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.number_of_items').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.number_of_items').textContent = 1;
    }
    setItems(product)
}

function setItems(product) {
    //update items in local storage
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.code] == undefined) {
            cartItems = {
                ...cartItems,
            [product.code] : product
            }
        }
        cartItems[product.code].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.code] : product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + parseInt(product.price) );
    } else {
        localStorage.setItem('totalCost', parseInt(product.price));
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)
    
    let productsContainer = document.querySelector('.cart_content')
    let cartCost = localStorage.getItem('totalCost');

    if ( cartItems && productsContainer) {
        productsContainer.innerHTML = `<div class="cart_all_products"></div>`;
        let allProducts = document.querySelector('.cart_all_products')
        Object.values(cartItems).map(item => {
            allProducts.innerHTML += `
            <div class="cart_product">
                <img src=${item.img} class="cart_product_img">
                <div class="inCart">${item.inCart}</div>
                <div class="cart_product_title_and_price">
                    <div class="cart_product_title">${item.title}</div>
                    <div class="cart_product_price">${item.price},00</div>
                </div>
                <img src="assets/icons/delete.png" class="cart_product_delete"> 
            </div>  `
        })
        // if the cart is not empty => display cart total
        if (parseInt(cartCost) != 0) {
        productsContainer.innerHTML += `
        <div class="cart_total">
        <div class="total_txt">Итого:<div class="cart_totalCost">${cartCost},00</div></div>
        <a href="#" class="go_to_cart">В Корзину</a>
        `}
        // if the cart is empty => display empty cart
        else {
            cartContent.innerHTML += `
            <div class="empty_cart">В корзине нет товаров</div>
            ` 
        }
        deleteProduct()
    } else {
        cartContent.innerHTML += `
        <div class="empty_cart">В корзине нет товаров</div>
        `
    }
}
displayCart()

function deleteProduct() {
    let cartProductDelete = document.getElementsByClassName('cart_product_delete');

    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart'); // typeof is string
    if (cartItems) {
        cartItems = JSON.parse(cartItems)
        cartItemsArr = Object.entries(cartItems)
        for(i=0; i < cartProductDelete.length; i++){
            let x = i
            cartProductDelete[i].addEventListener('click', () => {

                for (q=0; q < products.length; q++){
                    if (products[q].code == cartItemsArr[x][0]) {
                        products[q].inCart = 0;
                    }
                }

                localStorage.setItem('totalCost', cartCost - (parseInt(cartItemsArr[x][1].price) * parseInt(cartItemsArr[x][1].inCart)) );
                localStorage.setItem('cartNumbers', productNumbers - parseInt(cartItemsArr[x][1].inCart) );
                onLoadCartNumbers()

                cartItemsArr.splice(x, 1)
                let productsInCart = {};
                for (a=0; a < cartItemsArr.length; a++){
                    productsInCart = {
                        ...productsInCart,
                        [cartItemsArr[a][0]] : cartItemsArr[a][1]
                    }
                }
                localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
                displayCart();
            })          
        }
    }
}

cartFunction();

//cart___END------------------------------------------------------------------------------------------

// Pagination (Will show 4 items on each page):-------------------------------------------------------------
// let pageLinks = document.querySelectorAll('#pagination li');
let activePageNumber;
let clickedLink;
let leftArrow;
let rightArrow;

function hideAllItems(productsInPagination){
    //hide all items (full list before applying filters)
    let allProductsToHide = document.querySelectorAll('.product_item')
    for(i=0; i<allProductsToHide.length; i++){
        allProductsToHide[i].style.display = 'none';
    }
}

function handleNumberClick(clickedLink, leftArrow, rightArrow, itemsInOnePage, productsInPagination, numOfPages) {
    clickedLink.classList = "active_page";
    let clickedLinkPageNumber = parseInt(clickedLink.innerHTML);
    let start = +( (clickedLinkPageNumber-1) * itemsInOnePage );
    let end = start + itemsInOnePage;

    hideAllItems()
    for (i = start; i < end; i++){
            productsInPagination[i].style.display = '';
    }

    switch(clickedLinkPageNumber) {
        case 1:
            disableLeftArrow(leftArrow);
            if (rightArrow.className.indexOf('disabled') !== -1) {
                enableRightArrow(rightArrow);
            }
            break;
        case numOfPages:
            disableRightArrow(rightArrow);
            if (leftArrow.className.indexOf('disabled') !== -1) {
                enableLeftArrow(leftArrow);
            }
            break;
        default:
            if (leftArrow.className.indexOf('disabled') !== -1) {
                enableLeftArrow(leftArrow);
            }
            if (rightArrow.className.indexOf('disabled') !== -1) {
                enableRightArrow(rightArrow);
            }
            break;
    }
}

function handleLeftArrowClick(activePageNumber, leftArrow, rightArrow, itemsInOnePage, productsInPagination, numOfPages) {
    //move to previous page
    let previousPage = document.querySelectorAll('#pagination li')[activePageNumber-1];
    previousPage.classList = "active_page";

    let start = +( (activePageNumber-1) * itemsInOnePage );
    let end = start + itemsInOnePage;

    hideAllItems()
    for (i = start; i < end; i++){
            productsInPagination[i].style.display = '';
    }
   
    if (activePageNumber !== numOfPages) {
        enableRightArrow(rightArrow);
    }

    if (activePageNumber  === 1) {
        disableLeftArrow(leftArrow);
    }
}

function handleRightArrowClick(activePageNumber, leftArrow, rightArrow, itemsInOnePage, productsInPagination, numOfPages) {
    //move to next page
    let nextPage = document.querySelectorAll('#pagination li')[activePageNumber-1];
    nextPage.classList = "active_page";

    let start = +( (activePageNumber-1) * itemsInOnePage );
    let end = start + itemsInOnePage;

    hideAllItems()
    for (i = start; i < end; i++){
            productsInPagination[i].style.display = '';
    }

    if (activePageNumber !== 1) {
        enableLeftArrow(leftArrow);
    }

    if (activePageNumber  === numOfPages) {
        disableRightArrow(rightArrow);
    }
}

function disableLeftArrow(leftArrow) {
    leftArrow.classList = "disabled arrow-left fa fa-angle-double-left";
}

function enableLeftArrow(leftArrow) {
    leftArrow.classList = "arrow arrow-left fa fa-angle-double-left";
}

function disableRightArrow(rightArrow) {
    rightArrow.classList = "disabled arrow-right fa fa-angle-double-right";
}

function enableRightArrow(rightArrow) {
    rightArrow.classList = "arrow arrow-right fa fa-angle-double-right";
}


function pag(itemsInOnePage, productsInPagination){
    let numOfItems = productsInPagination.length
    let pagination = document.querySelector('#pagination');
    
    pagination.innerHTML = '';
    let numOfPages = Math.ceil(numOfItems / itemsInOnePage);
    for (let i=1; i<=numOfPages; i++){
        let li = document.createElement('li');
        li.innerHTML = i;
        
        if (i==1) { li.className = 'active_page' } //first page is active by default
        else {li.className = 'items_page_number' }
        pagination.appendChild(li);
    }

    //display first page items at begining
    hideAllItems(productsInPagination)
    for (i=0; i<itemsInOnePage; i++){
            productsInPagination[i].style.display = 'block';
    }

    //add events to arrows
    leftArrow = document.querySelector('.arrow-left');
    rightArrow = document.querySelector('.arrow-right');

    // at begining on page 1 active => styles for arrows
    disableLeftArrow(leftArrow);
    enableRightArrow(rightArrow);

    // do not use (addEventListener) to avoid duplicate the event each time pag() is called.
    leftArrow.onclick = function() {
        activeLink = document.querySelector('.active_page');
        activePageNumber = parseInt(activeLink.innerHTML);
        if (activePageNumber === 1) {
            return;
        }
        else {
            activeLink.classList = "items_page_number";
            activePageNumber = activePageNumber - 1;
            handleLeftArrowClick(activePageNumber, leftArrow, rightArrow, itemsInOnePage, productsInPagination, numOfPages);    
        }
    };

    // do not use (addEventListener) to avoid duplicate the event each time pag() is called.
    rightArrow.onclick = function() {
        activeLink = document.querySelector('.active_page');
        activePageNumber = parseInt(activeLink.innerHTML);
        if (activePageNumber === numOfPages) {
            return;
        }
        else {
            activeLink.classList = "items_page_number";
            activePageNumber = activePageNumber + 1;
            handleRightArrowClick(activePageNumber, leftArrow, rightArrow, itemsInOnePage, productsInPagination, numOfPages);    
        }
    };

    //add events to pages
    let pageLinks = document.querySelectorAll('#pagination li');
    for (let page of pageLinks) {
        page.onclick = function() {
            activeLink = document.querySelector('.active_page');
            //get active page number 
            activePageNumber = parseInt(activeLink.innerHTML);
            //update active class
            activeLink.classList = "items_page_number";
            handleNumberClick(this, leftArrow, rightArrow, itemsInOnePage, productsInPagination, numOfPages);
        };
    }
}
let allProducts = document.querySelectorAll('.product_item')
pag(4, allProducts);

// console.log(document.getElementsByTagName('html')[0].innerHTML);