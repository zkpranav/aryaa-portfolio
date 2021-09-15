const menuTrigger = document.querySelector('.menu-trigger')
const menu = document.querySelector('.menu')
const menuCollapse = document.querySelector('.menu-collapse')

menuTrigger.addEventListener('click', function handleMenuTriggerClick() {
    menu.style.display = 'block'
})

menuCollapse.addEventListener('click', function handleMenuCollapseClick() {
    menu.style.display = 'none'
})