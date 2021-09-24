import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
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
 * Global sizes object
 */
 const sizes = {
	width: canvasContainer.clientWidth,
	height: canvasContainer.clientHeight,
}

/**
 * Loaders
 */
// Texture Loader
const textureLoader = new THREE.TextureLoader()

// Draco Loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF Loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Instantiate scene
 */
const scene = new THREE.Scene()

/**
 * Textures
 */
function getBakedTexture(path) {
	const bakedTexture = textureLoader.load(path)
	bakedTexture.flipY = false
	bakedTexture.encoding = THREE.sRGBEncoding
	return bakedTexture
}

const bakedTexture1 = getBakedTexture('baked-1.jpg')
const bakedTexture2 = getBakedTexture('baked-2.jpg')
const bakedTexture3 = getBakedTexture('baked-3.jpg')

/**
 * Materials
 */
function getBakedMaterial(bakedTexture) {
	return new THREE.MeshBasicMaterial({
		map: bakedTexture,
		wireframe: false
	})
}

const bakedMaterial1 = getBakedMaterial(bakedTexture1)
const bakedMaterial2 = getBakedMaterial(bakedTexture2)
const bakedMaterial3 = getBakedMaterial(bakedTexture3)


/**
 * Model
 */
function addModelsToScene(path, bakedMaterial) {
	gltfLoader.load(
		path,
		(gltf) => {
			gltf.scene.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.material = bakedMaterial
				}
			})
	
			scene.add(gltf.scene)
		}
	)
}

addModelsToScene('models-3.glb', bakedMaterial3)
addModelsToScene('models-1.glb', bakedMaterial1)
addModelsToScene('models-2.glb', bakedMaterial2)

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
	50
)
// Move camera from (0, 0, 0)
camera.position.x = 30
camera.position.y = 5
camera.position.z = 30

scene.add(camera)


// Camera controls -- Orbit -- TODO: Modify --
const controls = new OrbitControls(camera, canvas)
controls.enablePan = false

// Damping controls
controls.enableDamping = true
controls.dampingFactor = 0.025

// Zoom controls
controls.enableZoom = false

// Rotation controls
controls.enableRotate = true
// Vertical rotation
controls.minPolarAngle = 0
controls.maxPolarAngle = Math.PI / 2
// Horizontal rotation
controls.minAzimuthAngle = 0
controls.maxAzimuthAngle = Math.PI / 2

// Deactivating controls
controls.enabled = false

/**
 * Toggle Interaction with Canvas
 */
const bedroomTrigger = document.querySelector('.bedroom-trigger')
// temp flag
let isCanvasActive = false

bedroomTrigger.addEventListener('click', async function handleBedroomTrigger() {
    if (!isCanvasActive) {
		bedroomTrigger.removeEventListener('click', handleBedroomTrigger)
		// Toggle pointer-events
		canvas.style['pointer-events'] = 'initial'
		// Flip flag
		isCanvasActive = true

		openingAnimation()

		// Changing text
		bedroomTrigger.innerHTML = 'Leave'
		// Toggle controls
		controls.enabled = true
		bedroomTrigger.addEventListener('click', handleBedroomTrigger)
    } else {
		bedroomTrigger.removeEventListener('click', handleBedroomTrigger)	
		// Toggle pointer-events
		canvas.style['pointer-events'] = 'none'
		// Toggle controls
		controls.enabled = false

		closingAnimation()

		// Changing text
		bedroomTrigger.innerHTML = 'Look Around'
		// Flip flag
		isCanvasActive = false
		bedroomTrigger.addEventListener('click', handleBedroomTrigger)
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
	return new Promise((resolve, reject) => {
		gsap.to(camera.position, {
			x: 12,
			y: 10,
			z: 12,
			duration: 2,
			ease: 'Power21.easeInOut',
			onComplete: resolve
		})
	})
}

function closingAnimation() {
	return new Promise((resolve, reject) => {
		gsap.to(camera.position, {
			x: 30,
			y: 5,
			z: 30,
			duration: 2,
			ease: 'Power1.easeInOut',
			onComplete: resolve
		})
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