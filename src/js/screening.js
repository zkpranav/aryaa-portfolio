import { gsap } from 'gsap'

const screeningDiv = document.querySelector('.screening')
const screeningPara = document.querySelector('.screening p')

gsap.set(screeningPara, {
    x: screeningDiv.clientWidth
})

const tl = gsap.timeline({
    repeat: -1,
})
tl.to(screeningPara, {
    x: -screeningDiv.clientWidth,
    duration: 4,
    ease: 'none'
})