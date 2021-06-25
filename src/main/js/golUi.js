function createGameOfLifeGrid() {
    const gridContainer = document.getElementById('gameOfLifeGrid');
    for (let row=0; row<50; row++) {
        for (let column=0; column<50; column++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item")
            gridItem.setAttribute('data-x', String(row))
            gridItem.setAttribute('data-y', String(column))
            gridItem.addEventListener("click", toggleColor, false)
            gridContainer.appendChild(gridItem)
        }
    }
}

function toggleColor(e) {
    if (e.target.style.backgroundColor === 'black') {
        e.target.style.backgroundColor = 'white'
    } else {
        e.target.style.backgroundColor = 'black'
    }
}

let simulationInterval;

function startSimulation() {
    console.log('starting simulation')
    simulationInterval = setInterval(runGameOfLife, 500)
}

function stopSimulation() {
    clearInterval(simulationInterval)
    console.log('simulation stopped')
}

function runGameOfLife() {
    console.log("running simulation...")
}
