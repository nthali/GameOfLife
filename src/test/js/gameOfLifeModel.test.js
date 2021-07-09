const { GameOfLife, CellLocation } = require('../../main/js/gameOfLifeModel')

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

    const locationInQuestion = new CellLocation(0, 0);

    test( 'living cell with no live neighbors dies in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        world.setLivingAt(locationInQuestion)
        // no living neighbors
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(false)
    })

    test( 'living cell with one live neighbors dies in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        world.setLivingAt(locationInQuestion)
        world.setLivingAt(new CellLocation(0, 1))
        // no living neighbors
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(false)
    })

    test( 'living cell with 2 live neighbors lives in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        world.setLivingAt(locationInQuestion)
        world.setLivingAt(new CellLocation(0, 1))
        world.setLivingAt(new CellLocation(1, 0))
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(true)
    })

    test( 'living cell with 3 live neighbors lives in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        world.setLivingAt(locationInQuestion)
        world.setLivingAt(new CellLocation(0, 1))
        world.setLivingAt(new CellLocation(1, 0))
        world.setLivingAt(new CellLocation(1, 1))
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(true)
    })

    test( 'living cell with more than 3 live neighbors DIES in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        world.setLivingAt(locationInQuestion)
        world.setLivingAt(new CellLocation(0, 1))
        world.setLivingAt(new CellLocation(1, 0))
        world.setLivingAt(new CellLocation(1, 1))
        world.setLivingAt(new CellLocation(-1, 0))
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(false)
    })

    test( 'dead cell with exactly 3 live neighbors COMES ALIVE in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        // Dead cell at 0,0 and 3 neighbors alive
        world.setLivingAt(new CellLocation(0, 1))
        world.setLivingAt(new CellLocation(1, 0))
        world.setLivingAt(new CellLocation(1, 1))
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(true)
    })

    test( 'dead cell with 2 live neighbors STAYS DEAD in the next generation', () => {
        let world = GameOfLife.emptyWorld()
        // Dead cell at 0,0 and 2 neighbors alive
        world.setLivingAt(new CellLocation(0, 1))
        world.setLivingAt(new CellLocation(1, 0))
        expect(world.aliveInNextGeneration(locationInQuestion)).toBe(false)
    })

    test( 'block still life stays in next generation', () => {
        let world = GameOfLife.emptyWorld()
        const location1 = new CellLocation(1,1);
        const location2 = new CellLocation(1,2);
        const location3 = new CellLocation(2,1);
        const location4 = new CellLocation(2,2);
        world.setLivingAt(location1)
        world.setLivingAt(location2)
        world.setLivingAt(location3)
        world.setLivingAt(location4)
        expect( world.aliveInNextGeneration(location1)).toBe(true)
        expect( world.aliveInNextGeneration(location2)).toBe(true)
        expect( world.aliveInNextGeneration(location3)).toBe(true)
        expect( world.aliveInNextGeneration(location4)).toBe(true)
    })

    test('blinker', () => {
        let world = GameOfLife.emptyWorld()
        const l1 = new CellLocation(2,1);
        const l2 = new CellLocation(2,2);
        const l3 = new CellLocation(2,3);
        world.setLivingAt(l1)
        world.setLivingAt(l2)
        world.setLivingAt(l3)
        expect( world.aliveInNextGeneration(l1)).toBe(false)
        expect( world.aliveInNextGeneration(l2)).toBe(true)
        expect( world.aliveInNextGeneration(l3)).toBe(false)
        expect( world.aliveInNextGeneration(new CellLocation(1, 2))).toBe(true)
        expect( world.aliveInNextGeneration(new CellLocation(3, 2))).toBe(true)
    })
})
