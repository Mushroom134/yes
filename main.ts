function randommaze () {
    tiles.setCurrentTilemap(tilemap`level2`)
    cursor = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . f f f f f f f f f f f f f f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f . . . . . . . . . . . . f . 
        . f f f f f f f f f f f f f f . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    tiles.placeOnTile(cursor, tiles.getTileLocation(0, 0))
    visitedcells = [cursor.tilemapLocation()]
    while (visitedcells.length > 0) {
        currentcell = visitedcells.pop()
        tiles.placeOnTile(cursor, currentcell)
        tiles.setTileAt(currentcell, sprites.dungeon.floorLight2)
        if (cursor.tileKindAt(TileDirection.Right, assets.tile`transparency16`)) {
            tiles.placeOnTile(cursor, tiles.getTileLocation(currentcell.column, currentcell.row + 1))
        }
    }
}
let currentcell: tiles.Location = null
let visitedcells: tiles.Location[] = []
let cursor: Sprite = null
tiles.setCurrentTilemap(tilemap`level3`)
let flame = sprites.create(assets.image`myImage`, SpriteKind.Food)
randommaze()
