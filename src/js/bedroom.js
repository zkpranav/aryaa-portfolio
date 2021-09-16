import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'gsap'

/**
 * Debug UI --Pull before deployment--
 */

/**
 * Fetch reference to canvas
 */
const canvas = document.querySelector('.bedroom-canvas')
const canvasContainer = document.querySelector('.bedroom')

/**
 * Instantiate scene
 */
const scene = new THREE.Scene()

/**
 * Test Object
 */
const geometry = new THREE.SphereGeometry(1, 8, 8)
const material = new THREE.MeshBasicMaterial({
	color: 'hsla(165, 100%, 48%, 1)',
	wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

/**
 * Global sizes object
 */
const sizes = {
	width: canvasContainer.clientWidth,
	height: canvasContainer.clientHeight,
}

/**
 * Handle resize event
 */
window.addEventListener('resize', function handleResizeInCanvas() {
	// Update sizes
	sizes.width = canvasContainer.clientWidth
	sizes.height = canvasContainer.clientHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Create the camera
 */
const camera = new THREE.PerspectiveCamera(
	45,
	sizes.width / sizes.height,
	0.1,
	100
)
// Move camera from (0, 0, 0)
camera.position.z = 50

scene.add(camera)


// Camera controls -- Orbit -- TODO: Modify --
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false
controls.enablePan = false
controls.enabled = false

/**
 * Control toggle
 */
const bedroomTrigger = document.querySelector('.bedroom-trigger')
// temp flag
let isCanvasActive = false

bedroomTrigger.addEventListener('click', function handleBedroomTrigger() {
    if (!isCanvasActive) {
		// Changing text
		bedroomTrigger.innerHTML = 'Exit'

		// Toggle pointer-events
		canvas.style['pointer-events'] = 'initial'

        /**
         * TODO: Maximize canvas
         */
		openingAnimation()
		isCanvasActive = true

		// Toggle controls
		controls.enabled = true
    } else {
		// Changing text
		bedroomTrigger.innerHTML = 'Look Around'

		// Toggle pointer-events
		canvas.style['pointer-events'] = 'none'

        /**
         * TODO: Minimize canvas
         */
		closingAnimation()
		isCanvasActive = false

		// Toggle controls
		controls.enabled = true
    }
})

/**
 * Create the renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true,
})

// Set renderer size and pixel-ratio
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Set color encoding
renderer.outputEncoding = THREE.sRGBEncoding


/**
 * GSAP animations
 */
function openingAnimation() {
	const tl = gsap.timeline()

	tl.to(camera.position, {
		z: 5,
		duration: 2,
		ease: 'Power2.easeOut'
	})
}

function closingAnimation() {
	const tl = gsap.timeline()

	tl.to(camera.position, {
		z: 50,
		duration: 2,
		ease: 'Power2.easeIn'
	})
}


/**
 * Animate function
 */
const clock = new THREE.Clock()

const tick = () => {
	const elapsedTime = clock.getElapsedTime()

	// Update controls
	controls.update()

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}
tick()