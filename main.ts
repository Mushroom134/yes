function randommaze () {
    tiles.setCurrentTilemap(tilemap`level2`)
    lastrow = 32
    lastcolumn = 32
    cursor = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . f f f f f f f f f f f f f f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f f f f f f f f f f f f f f . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    tiles.placeOnTile(cursor, tiles.getTileLocation(0, 0))
    scene.cameraFollowSprite(cursor)
    visitedcells = [cursor.tilemapLocation()]
    while (visitedcells.length > 0) {
        currentcell = visitedcells.pop()
        tiles.placeOnTile(cursor, currentcell)
        tiles.setTileAt(currentcell, sprites.dungeon.floorLight2)
        candidatelocations = []
        if (cursor.tilemapLocation().column < lastcolumn && cursor.tileKindAt(TileDirection.Right, assets.tile`transparency16`)) {
            candidatelocations.push(tiles.getTileLocation(cursor.tilemapLocation().column + 1, cursor.tilemapLocation().row))
        }
        if (cursor.tilemapLocation().column > 0 && cursor.tileKindAt(TileDirection.Left, assets.tile`transparency16`)) {
            candidatelocations.push(tiles.getTileLocation(cursor.tilemapLocation().column - 1, cursor.tilemapLocation().row))
        }
        if (cursor.tilemapLocation().row > 0 && cursor.tileKindAt(TileDirection.Top, assets.tile`transparency16`)) {
            candidatelocations.push(tiles.getTileLocation(cursor.tilemapLocation().column, cursor.tilemapLocation().row - 1))
        }
        if (cursor.tilemapLocation().row < lastrow && cursor.tileKindAt(TileDirection.Bottom, assets.tile`transparency16`)) {
            candidatelocations.push(tiles.getTileLocation(cursor.tilemapLocation().column, cursor.tilemapLocation().row + 1))
        }
        branch = cursor.tilemapLocation()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    flamelist.push(otherSprite.tilemapLocation())
    sprites.destroy(otherSprite, effects.fire, 100)
    if (flamelist.length == 5) {
        game.gameOver(true)
    }
})
let branch: tiles.Location = null
let candidatelocations: tiles.Location[] = []
let currentcell: tiles.Location = null
let visitedcells: tiles.Location[] = []
let cursor: Sprite = null
let lastcolumn = 0
let lastrow = 0
let flamelist: tiles.Location[] = []
tiles.setCurrentTilemap(tilemap`level3`)
let user = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . e e e e e e e . . . . . 
    . . . e e e e e e e e e . . . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e . . . 
    . . . e e e e e e e e e . . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
tiles.placeOnTile(user, tiles.getTileLocation(1, 1))
scene.cameraFollowSprite(user)
controller.moveSprite(user, 100, 100)
let flame1 = sprites.create(assets.image`myImage`, SpriteKind.Food)
let flame2 = sprites.create(assets.image`myImage`, SpriteKind.Food)
let flame3 = sprites.create(assets.image`myImage`, SpriteKind.Food)
tiles.placeOnRandomTile(flame1, sprites.dungeon.floorLight2)
tiles.placeOnRandomTile(flame2, sprites.dungeon.floorLight2)
tiles.placeOnRandomTile(flame3, sprites.dungeon.floorLight2)
flamelist = []
let portal = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . b b b b b . . . . . 
    . . . . b b b c c c b b b . . . 
    . . . b b c c c c c c c b b . . 
    . . . b c c f f f f f c c b . . 
    . . b b c f f f f f f f c b b . 
    . . b c c f f f f f f f c c b . 
    . . b c c f f f f f f f c c b . 
    . . b c c f f f f f f f c c b . 
    . . b c c f f f f f f f c c b . 
    . . b b c c f f f f f c c b b . 
    . . . b b c c c c c c c b b . . 
    . . . . b b c c c b b b b . . . 
    . . . . . b b b b . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, MapConnectionKind.Door1)
tiles.placeOnRandomTile(portal, sprites.dungeon.floorLight2)
