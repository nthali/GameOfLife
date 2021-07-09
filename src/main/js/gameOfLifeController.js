// const {CellLocation} = require('../../main/js/gameOfLife')

function createGameOfLifeGrid() {
    const gridContainer = document.getElementById('gameOfLifeGrid');
    for (let row = 0; row < gridDimension; row++) {
        for (let column = 0; column < gridDimension; column++) {
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
    simulationInterval = setInterval(nextGen, 500)
}

let gameOfLife = new GameOfLifeModel();

function nextGen() {
    console.log("running simulation...")
    fromViewToModel()
    let nextGenLivingCells = []
    for (let row = 0; row < gridDimension; row++) {
        for (let column = 0; column < gridDimension; column++) {
            const cellLocation = new CellLocation(row, column);
            if (gameOfLife.aliveInNextGeneration(cellLocation)) {
                nextGenLivingCells.push(cellLocation)
            }
        }
    }
    gameOfLife.livingCells = nextGenLivingCells
    fromModelToView()
}

function clearGrid() {
    const uiGridItems = document.getElementById('gameOfLifeGrid').children
    let gridItem;
    for ( gridItem of uiGridItems) {
        gridItem.style.backgroundColor = 'white'
    }
}

function stopSimulation() {
    clearInterval(simulationInterval)
    clearGrid()
    gameOfLife.clear()
    console.log('simulation stopped')
}

function fromViewToModel() {
    const uiGridItems = document.getElementById('gameOfLifeGrid').children
    let gridItem;
    for ( gridItem of uiGridItems) {
        if (gridItem.style.backgroundColor === 'black') {
            gameOfLife.setLivingAt(
                new CellLocation(
                    Number(gridItem.getAttribute('data-x')),
                    Number(gridItem.getAttribute('data-y'))
                )
            )
        }
    }
}

function fromModelToView() {
    const uiGridItems = document.getElementById('gameOfLifeGrid').children
    let gridItem;
    for (gridItem of uiGridItems) {
        const livingCell = gameOfLife.livingCells.find(cell =>
            cell.x === Number(gridItem.getAttribute('data-x')) &&
            cell.y === Number(gridItem.getAttribute('data-y'))
        )
        gridItem.style.backgroundColor = livingCell !== undefined ? 'black' : 'white';
    }
}