let carts = document.querySelectorAll('.add_to_cart');

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        console.log('added')
    })
}
