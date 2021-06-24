class GameOfLife {
    empty = true

    isEmpty() {
        return this.empty
    }

    setLivingAt(location) {
        this.empty = false
    }

    tick() {

    }

    static emptyWorld() {
        return new GameOfLife();
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