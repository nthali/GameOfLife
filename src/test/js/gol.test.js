const { GameOfLife, Location } = require('../../main/js/Gol')

/*
1. If a living cell has less than two living neighbors, it is dead in
the next generation, as if by underpopulation.
2. If a living cell has two or three living neighbors, it stays alive
in the next generation.
3. If a living cell has more than three living neighbors, it is dead
in the next generation, as if by overcrowding.
4. If a dead cell has exactly three living neighbors, it comes to
life in the next generation.
 */
describe( 'Game of life tests', () => {
    // 1. Test names should influence Object's API
    // 2. (remove) Duplication of knowledge about topology - from (x, y) to Location objects

    // 3. Testing state vs Testing behavior

    test( 'a new world is empty', () => {
        let world = new GameOfLife()
        expect(world.isEmpty()).toBe(true)
    })

    test('world is not empty after adding a living cell', () => {
        let world = new GameOfLife()
        world.setLivingAt(locationInQuestion)
        expect(world.isEmpty()).toBe(false)
    })

    // 4. Don't have tests depend on previous tests
    test( 'empty world stays empty after tick', () => {
        let world = GameOfLife.emptyWorld() // no longer calling new
        world.tick()
        expect( world.isEmpty() ).toBe( true )
    })

    const locationInQuestion = new Location(0, 0);

    test( 'living cell with no live neighbors dies in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        world.setLivingAt(locationInQuestion)
        // no living neighbors
        // world.tick()
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(false)
    })

    test( 'living cell with one live neighbors dies in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        world.setLivingAt(locationInQuestion)
        world.setLivingAt(new Location(0, 1))
        // no living neighbors
        // world.tick()
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(false)
    })

    test( 'living cell with 2 live neighbors lives in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        world.setLivingAt(locationInQuestion)
        world.setLivingAt(new Location(0, 1))
        world.setLivingAt(new Location(1, 0))
        // world.tick()
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(true)
    })

    test( 'living cell with 3 live neighbors lives in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        world.setLivingAt(locationInQuestion)
        world.setLivingAt(new Location(0, 1))
        world.setLivingAt(new Location(1, 0))
        world.setLivingAt(new Location(1, 1))
        // world.tick()
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(true)
    })

    test( 'living cell with more than 3 live neighbors DIES in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        world.setLivingAt(locationInQuestion)
        world.setLivingAt(new Location(0, 1))
        world.setLivingAt(new Location(1, 0))
        world.setLivingAt(new Location(1, 1))
        world.setLivingAt(new Location(-1, 0))
        // world.tick()
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(false)
    })

    test( 'dead cell with exactly 3 live neighbors COMES ALIVE in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        // Dead cell at 0,0 and 3 neighbors alive
        world.setLivingAt(new Location(0, 1))
        world.setLivingAt(new Location(1, 0))
        world.setLivingAt(new Location(1, 1))
        // world.tick()
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(true)
    })

    test( 'dead cell with 2 live neighbors STAYS DEAD in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        // Dead cell at 0,0 and 2 neighbors alive
        world.setLivingAt(new Location(0, 1))
        world.setLivingAt(new Location(1, 0))
        // world.tick()
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(false)
    })
})
