function randommaze () {
    tiles.setCurrentTilemap(tilemap`level2`)
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
    visitedcells = [cursor.tilemapLocation()]
    while (visitedcells.length > 0) {
        currentcell = visitedcells.pop()
        tiles.placeOnTile(cursor, currentcell)
        tiles.setTileAt(currentcell, sprites.dungeon.floorLight2)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    flamelist.push(otherSprite.tilemapLocation())
    sprites.destroy(otherSprite, effects.fire, 100)
    if (flamelist.length == 5) {
        game.gameOver(true)
    }
})
let currentcell: tiles.Location = null
let visitedcells: tiles.Location[] = []
let cursor: Sprite = null
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
