class GameOfLife {
    livingCells = []

    static emptyWorld() {
        return new GameOfLife();
    }

    isEmpty() {
        return this.livingCells.length === 0
    }

    setLivingAt(location) {
        this.livingCells.push(location)
    }

    tick() {
        let newGeneration = []
        this.livingCells.forEach((livingCell, index, array) => {
            if (this.aliveInNextGeneration(livingCell)) {
                newGeneration.push(livingCell)
            }
        })
        this.livingCells = newGeneration
    }

    aliveInNextGeneration(cell) {
        let numLivingNeighbors = 0
        let iAmAlive = this.livingNow(cell) // this check is redundant if method called from tick()
        this.neighborsOfCellAt(cell.x, cell.y).forEach(neighbor => {
            if (this.livingNow(neighbor))
                numLivingNeighbors++
        })
        return iAmAlive ? numLivingNeighbors >=2 && numLivingNeighbors < 4 : numLivingNeighbors === 3
    }

    livingNow(locationInQuestion) {
        return this.livingCells.find( location => location.x === locationInQuestion.x && location.y === locationInQuestion.y ) !== undefined;
    }

    /*
        [x-1,y+1] [x,y+1] [x+1,y+1]
        [x-1,y]   [x,y]   [x+1,y]
        [x-1,y-1] [x,y-1] [x+1,y-1]
     */
    neighborsOfCellAt(x, y) {
        return [
            new Location(x-1, y+1), new Location(x, y+1), new Location(x+1, y+1),
            new Location( x-1, y), new Location(x+1, y),
            new Location(x-1, y-1), new Location(x, y-1), new Location(x+1, y-1)
        ]
    }
}

class Location {
    constructor( x, y ) {
        this.x = x;
        this.y = y;
    }
}

module.exports = {
    GameOfLife,
    Location
}