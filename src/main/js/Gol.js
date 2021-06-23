class GameOfLife {
    empty = true

    isEmpty() {
        return this.empty
    }

    setLivingAt(x, y) {
        this.empty = false
    }
}
module.exports = {
    GameOfLife
}