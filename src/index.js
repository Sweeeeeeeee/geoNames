jsonData = {}

function update() {
    let total = 0
    const checked = document.querySelectorAll('.cat-check:checked')
    
    checked.forEach(cb => {
        	total += jsonData[cb.value].length
    	}
	)
    
    document.getElementById('totalCounter').innerText = "Selected: " + total
}

function load() {
	fetch('data.json').then(response => response.json()).then(data => {
			jsonData = data

            const container = document.getElementById('optionsContainer')
			let total = 0

            Object.keys(data).forEach(key => {
                    const count = data[key].length
					total += count

					const label = document.createElement('label')

                	label.innerHTML = `<input type = "checkbox" value = "${key}" class = "cat-check" onchange = "update()"> ${key} (${count})`
                	container.appendChild(label)
            	}
			)

			document.getElementById('totalCounter').innerText = "Selected: 0"
        }
	)

	const slider = document.getElementById("popSlider")
    updateSliderDisplay(slider.value)
}

function updateSliderDisplay(val) {
    document.getElementById('popDisplay').innerText = Number(val).toLocaleString();
}

async function startLatviaGame() {
    const minPopulation = Number(document.getElementById('popSlider').value)

    const response = await fetch('data2.json')
    const data = await response.json()

    const filteredCities = Object.keys(data).filter(key => {
        	return Number(data[key]) > minPopulation;
    	}
	)

    localStorage.setItem('selectedCategories', JSON.stringify(filteredCities))

    window.location.href = "game2.html"
}

function selectAll() {
	const checkBoxes = document.querySelectorAll('.cat-check')
	checkBoxes.forEach(cb => {
			cb.checked = true
		}
	)

	update()
}

function unselectAll() {
	const checkBoxes = document.querySelectorAll('.cat-check')
	checkBoxes.forEach(cb => {
			cb.checked = false
		}
	)

	update()
}

function startGame() {
    const selected = Array.from(document.querySelectorAll('.cat-check:checked')).map(cb => cb.value)
            
    if (selected.length > 0) {
        localStorage.setItem('selectedCategories', JSON.stringify(selected))
        window.location.href = 'game.html'
    }else {
        alert("Choose at least one!")
    }
}

load()
