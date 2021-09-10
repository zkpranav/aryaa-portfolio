import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Debug UI --Pull before deployment--
 */

/**
 * Fetch reference to canvas
 */
const canvas = document.querySelector('#bedroom-handle')

/**
 * Instantiate scene
 */
const scene = new THREE.Scene()

/**
 * Test Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16)
const material = new THREE.MeshBasicMaterial({
	color: '#ff0000',
	wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

/**
 * Global sizes object
 */
const sizes = {
	width: canvas.clientWidth,
	height: canvas.clientHeight,
}

/**
 * Handle resize event
 */
window.addEventListener('resize', function handleResizeInCanvas() {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

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
camera.position.z = 3

scene.add(camera)


// Camera controls -- Orbit -- Modify --
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enabled = false

/**
 * Control toggle
 */
const bedroomToggle = document.querySelector('#bedroom-toggle')
bedroomToggle.addEventListener('click', function handleBedroomToggle() {
    if (!controls.enabled) {
        controls.enabled = true
    } else {
        controls.enabled = false
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
