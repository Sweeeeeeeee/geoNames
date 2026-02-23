let fullPool = []

function load() {
    fetch('data.json').then(response => response.json()).then(data => {
            const selected = JSON.parse(localStorage.getItem('selectedCategories'))
            selected.forEach(cat => {
                	fullPool = fullPool.concat(data[cat])
            	}
			)
			
			document.getElementById('totalCounter').innerText = "Selected: " + fullPool.length
		}
	)
}

function guess() {
    const randomItem = fullPool[Math.floor(Math.random() * fullPool.length)]
    document.getElementById('result').innerText = randomItem
}

function searchMap() {
    const location = document.getElementById('result').innerText
    if (location) {
        const frame = document.getElementById('mapFrame')

		const zoomLevel = 6
		const simpleUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&hl=lv&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`
        
		frame.src = simpleUrl
		frame.style.display = "block"
    }
}

load()
