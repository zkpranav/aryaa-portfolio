const menuTrigger = document.querySelector('.menu-trigger')
const menu = document.querySelector('.menu-items')
const menuCollapse = document.querySelector('.menu-collapse')

menuTrigger.addEventListener('click', function handleMenuClick(e) {
    menuTrigger.style.display = 'none'
    menu.style.display = 'flex'
})

menuCollapse.addEventListener('click', function handleMenuCollapse(e) {
    menu.style.display = 'none'
    menuTrigger.style.display = 'flex'
})