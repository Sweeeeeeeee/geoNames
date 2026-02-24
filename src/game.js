let fullPool = []

function load() {
    fetch("data.json").then(response => response.json()).then(data => {
            const selected = JSON.parse(localStorage.getItem("selectedCategories"))
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

function show() {
    const location = document.getElementById('result').innerText
    if (location && location !== "-----") {
        const mapFrame = document.getElementById('mapFrame')
        const wikiFrame = document.getElementById('wikiFrame')

		const zoomLevel = 6
		const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&hl=lv&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`
		mapFrame.src = mapUrl

		const wikiUrl = `https://lv.m.wikipedia.org/w/index.php?search=${encodeURIComponent(location)}&title=Special:Search&go=Go`;

		wikiFrame.src = wikiUrl
		
		if (mapFrame.style.display === "none" && wikiFrame.style.display === "none") {
            switchView("map")
        }
    }
}

function switchView(type) {
	const map = document.getElementById("mapFrame")
	const wiki = document.getElementById('wikiFrame')
	const btns = document.querySelectorAll('.tabBtn')

	if (type === "map") {
        map.style.display = "block"
        wiki.style.display = "none"
        btns[0].classList.add('active')
        btns[1].classList.remove('active')
    }else {
        map.style.display = "none"
        wiki.style.display = "block"
        btns[0].classList.remove('active')
        btns[1].classList.add('active')
    }
}

load()
