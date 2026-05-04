let jsonData = {}

function update() {
    let total = 0
    const checked = document.querySelectorAll(".cat-check:checked")
    
    checked.forEach(cb => {
        	total += Object.keys(jsonData[cb.value]).length
    	}
	)
    
    document.getElementById("totalCounter").innerText = "Selected: " + total
}

function load() {
    fetch("data1.json").then(response => response.json()).then(data => {
        	jsonData = data

       	 	const container = document.getElementById("optionsContainer")
        	let total = 0

        	Object.keys(data).forEach(key => {
            		const count = Object.keys(data[key]).length
            		total += count

            		const label = document.createElement("label")

            		label.innerHTML = `<input type = "checkbox" value = "${key}" class = "cat-check" onchange = "update()"> ${key} (${count})`
            		container.appendChild(label)
        		}
			)

        	document.getElementById("totalCounter").innerText = "Selected: 0"
    	}
	)

    const slider = document.getElementById("popSlider")
    updateSliderDisplay(slider.value)
}

function updateSliderDisplay(val) {
    document.getElementById("popDisplay").innerText = Number(val).toLocaleString()
}

function selectAll() {
    const checkBoxes = document.querySelectorAll(".cat-check")
    checkBoxes.forEach(cb => {
        	cb.checked = true
    	}
	)

    update()
}

function unselectAll() {
    const checkBoxes = document.querySelectorAll(".cat-check")
    checkBoxes.forEach(cb => {
        	cb.checked = false
    	}
	)

    update()
}

function startGame() {
    const selected = Array.from(document.querySelectorAll(".cat-check:checked")).map(cb => cb.value)
    const minPopulation = Number(document.getElementById("popSlider").value)

    if (selected.length > 0) {
        const filtered = {}

        selected.forEach(cat => {
            	const items = jsonData[cat]

            	const filteredItems = Object.fromEntries(
                	Object.entries(items).filter(([name, pop]) => pop > minPopulation)
            	)

            	if (Object.keys(filteredItems).length > 0) {
                	filtered[cat] = filteredItems
            	}
        	}
		)

        localStorage.setItem("selectedCategories", JSON.stringify(filtered))
        window.location.href = "game1.html"
    }else {
        alert("Choose at least one!")
    }
}

function goBack() {
	window.location.href = "index.html"
}

load()
