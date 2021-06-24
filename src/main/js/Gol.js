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

    aliveInNextGeneration(livingCell) {
        let numLivingNeighbors = 0
        this.neighborsOfCellAt(livingCell.x, livingCell.y).forEach(neighbor => {
            if (this.aliveAt(neighbor))
                numLivingNeighbors++
        })
        if (numLivingNeighbors >= 2)
            return true
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

    aliveAt(locationInQuestion) {
        return this.livingCells.find( location => location.x === locationInQuestion.x && location.y === locationInQuestion.y ) !== undefined;
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