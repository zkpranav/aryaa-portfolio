import { gsap } from 'gsap'

const menuTrigger = document.querySelector('.menu-trigger')
const menu = document.querySelector('.menu')
const menuCollapse = document.querySelector('.menu-collapse')

gsap.set(menu, {
    y: - (menu.clientHeight),
    opacity: 0,
    display: 'block'
})

const tl = gsap.timeline()

menuTrigger.addEventListener('click', function handleMenuTriggerClick() {
    tl.to(menu, {
        y: 0,
        opacity: 1,
        duration: 0.25,
        ease: 'Power2.easeOut'
    })
})

menuCollapse.addEventListener('click', function handleMenuCollapseClick() {
    tl.to(menu, {
        y: - (menu.clientHeight + 5),
        opacity: 0,
        duration: 0.25,
        ease: 'Power2.easeOut'
    })
})