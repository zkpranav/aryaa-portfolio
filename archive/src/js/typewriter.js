window.addEventListener('load', function handleTypewriting() {
	const elements = document.querySelectorAll('.typewriter')
    const injectElements = document.querySelectorAll('.inject')
	for (let i = 0; i < elements.length; i++) {
        const injectElement = injectElements[i]
		const toRotate = elements[i].getAttribute('data-sentences')
		if (toRotate) {
			new Typewriter(elements[i], JSON.parse(toRotate), injectElement)
		}
	}
})

class Typewriter {
    constructor(element, toRotate, injectElement) {
        this.element = element
        this.injectElement = injectElement
        this.toRotate = toRotate
        this.rotationPointer = 0
        this.text = ''

        this.tick = this.tick.bind(this)
        this.tick()

        this.isDeleting = false
    }

    tick() {
        /**
         * Pull a sentence
         */
        let i = this.rotationPointer % this.toRotate.length
        const sentence = this.toRotate[i]

        /**
         * Determine what to inject
         */
        if (this.isDeleting) {
            this.text = sentence.substring(0, this.text.length - 1)
        } else {
            this.text = sentence.substring(0, this.text.length + 1)
        }

        /**
         * Perform injection
         */
        this.injectElement.innerHTML = this.text

        /**
         * Determine delay
         */
        let delay = Math.floor(Math.random() * 100) + 100
        if (this.isDeleting) {
            delay = delay * 0.5
        }

        /**
         * Toggle isDeleting
         */
        if (!this.isDeleting && this.text == sentence) {
            this.isDeleting = true
            // Wait 2 seconds
            delay = 2000
        } else if (this.isDeleting && this.text == '') {
            this.isDeleting = false
            this.rotationPointer += 1
            // Wait half a second
            delay = 500
        }

        setTimeout(this.tick, delay)
    }
}