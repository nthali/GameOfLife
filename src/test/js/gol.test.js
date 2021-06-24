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

    // 4. Don't have tests depend on previous tests
    test( 'empty world stays empty after tick', () => {
        let world = GameOfLife.emptyWorld()
        world.tick()
        expect( world.isEmpty() ).toBe( true )
    })

    test('world is not empty after adding a living cell', () => {
        let world = new GameOfLife()
        world.setLivingAt(new Location(0, 0))
        expect(world.isEmpty()).toBe(false)
    })

})
