namespace SpriteKind {
    export const Nomnom = SpriteKind.create()
}
function randommaze () {
    tiles.setCurrentTilemap(tilemap`level2`)
    lastrow = 31
    lastcolumn = 31
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
    scene.cameraFollowSprite(cursor)
    visitedcells = [cursor.tilemapLocation()]
    while (visitedcells.length > 0) {
        currentcell = visitedcells.pop()
        tiles.placeOnTile(cursor, currentcell)
        if (level == 1) {
            tiles.setTileAt(currentcell, sprites.dungeon.floorLight2)
        } else {
            tiles.setTileAt(currentcell, sprites.castle.tilePath5)
        }
        candidatelocations = []
        currentlocation = cursor.tilemapLocation()
        if (currentlocation.column < lastcolumn && cursor.tileKindAt(TileDirection.Right, assets.tile`transparency16`)) {
            candidatelocations.push(tiles.getTileLocation(currentlocation.column + 1, currentlocation.row))
        }
        if (currentlocation.column > 0 && cursor.tileKindAt(TileDirection.Left, assets.tile`transparency16`)) {
            candidatelocations.push(tiles.getTileLocation(currentlocation.column - 1, currentlocation.row))
        }
        if (currentlocation.row > 0 && cursor.tileKindAt(TileDirection.Top, assets.tile`transparency16`)) {
            candidatelocations.push(tiles.getTileLocation(currentlocation.column, currentlocation.row - 1))
        }
        if (currentlocation.row < lastrow && cursor.tileKindAt(TileDirection.Bottom, assets.tile`transparency16`)) {
            candidatelocations.push(tiles.getTileLocation(currentlocation.column, currentlocation.row + 1))
        }
        branch = cursor.tilemapLocation()
        while (candidatelocations.length > 0) {
            tiles.placeOnTile(cursor, candidatelocations.removeAt(randint(0, candidatelocations.length - 1)))
            count = 0
            if (cursor.tileKindAt(TileDirection.Top, sprites.dungeon.floorLight2)) {
                count += 1
            }
            if (cursor.tileKindAt(TileDirection.Left, sprites.dungeon.floorLight2)) {
                count += 1
            }
            if (cursor.tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight2)) {
                count += 1
            }
            if (cursor.tileKindAt(TileDirection.Right, sprites.dungeon.floorLight2)) {
                count += 1
            }
            if (count == 1 || Math.percentChance(25) && count == 2) {
                visitedcells.push(branch)
                visitedcells.push(cursor.tilemapLocation())
                break;
            }
        }
    }
    wall_tile = tiles.getTilesByType(assets.tile`transparency16`)
    for (let value of wall_tile) {
        if (level == 1) {
            tiles.setTileAt(value, sprites.builtin.forestTiles0)
        } else {
            tiles.setTileAt(value, sprites.swamp.swampTile1)
        }
        tiles.setWallAt(value, true)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Nomnom, function (sprite, otherSprite) {
    if (sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)) && otherSprite.image.equals(img`
        . . . . . . f f f . . . . . . . 
        . . . . . . f 8 f f . . . . . . 
        . . . . . . f f 8 f f . f . . . 
        . . . . . . . f 8 8 f . . . . . 
        . . . . . . f f 8 9 8 f . . . . 
        . . . . . . f 8 8 9 8 f . . . . 
        . . . . . f f 8 9 9 8 f f . . . 
        . . . . . f 8 9 9 9 8 8 f . . . 
        . . . f f 8 9 9 9 1 9 8 f . . . 
        . . f f 8 8 9 9 1 1 9 8 f f . . 
        . f f 8 9 9 9 1 9 1 9 8 8 f . . 
        . f 8 9 9 1 9 9 1 9 9 9 8 f . . 
        . f 8 9 9 9 1 9 1 1 9 9 8 f . . 
        . f 8 8 9 1 1 1 1 1 9 9 8 f . . 
        . f f 8 9 9 1 1 1 1 9 8 8 f . . 
        . . . f 8 9 1 1 1 9 9 8 f f . . 
        `)) {
        sprites.destroy(otherSprite, effects.clouds, 100)
        mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score, 1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)) && Gasoline1.image.equals(assets.image`myImage`)) {
        sprites.destroy(otherSprite, effects.halo, 100)
        mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, 1)
    }
})
let wall_tile: tiles.Location[] = []
let count = 0
let branch: tiles.Location = null
let currentlocation: tiles.Location = null
let candidatelocations: tiles.Location[] = []
let currentcell: tiles.Location = null
let visitedcells: tiles.Location[] = []
let cursor: Sprite = null
let lastcolumn = 0
let lastrow = 0
let Doors = 0
let Door = 0
let Gasoline1: Sprite = null
let level = 0
level = game.askForNumber("Map 1 or 2?", 1)
tiles.setCurrentTilemap(tilemap`level3`)
splitScreen.setSplitScreenEnabled(true)
splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.HorizontalTopHalf)
splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.HorizontalBottomHalf)
splitScreen.setBorderColor(15)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 5 5 5 5 5 . . . . . . 
    . . 5 5 5 5 5 5 5 5 . . . . . . 
    . . . . . . . . . 5 5 . . . . . 
    5 . . . . . 5 5 5 5 5 5 . . . . 
    5 5 5 . . 5 5 5 5 5 5 f 1 . . . 
    5 5 5 5 . 5 5 5 5 5 5 f f 5 . . 
    . . 5 5 5 5 5 4 5 5 5 5 5 5 5 . 
    . . 5 5 5 5 5 5 4 4 5 5 5 5 5 . 
    . 5 5 4 4 4 4 5 5 5 5 5 4 4 . . 
    5 5 4 4 . . 4 4 4 4 4 4 4 . . . 
    5 5 4 . . . . . . . . . . . . . 
    5 4 . . . . . . . . . . . . . . 
    4 . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player))
splitScreen.cameraFollowSprite(splitScreen.Camera.Camera1, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 2 2 2 2 2 2 2 . . . . 
    . . . . . 9 2 9 2 9 2 9 . . . . 
    . . . . . 9 2 9 2 9 2 9 . . . . 
    . . . . . 9 2 9 2 9 2 9 . . . . 
    . 5 2 2 2 2 2 2 2 2 2 2 2 2 5 . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    . 2 f f f 2 2 2 2 2 2 f f f 2 . 
    . 2 f d f 2 2 2 2 2 2 f d f 2 . 
    . . f f f . . . . . . f f f . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player))
splitScreen.cameraFollowSprite(splitScreen.Camera.Camera2, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One))
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two))
let Gasoline2 = sprites.create(assets.image`myImage`, SpriteKind.Food)
let Gasoline3 = sprites.create(assets.image`myImage`, SpriteKind.Food)
Gasoline1 = sprites.create(assets.image`myImage`, SpriteKind.Food)
let Flame1 = sprites.create(img`
    . . . . . . f f f . . . . . . . 
    . . . . . . f 8 f f . . . . . . 
    . . . . . . f f 8 f f . f . . . 
    . . . . . . . f 8 8 f . . . . . 
    . . . . . . f f 8 9 8 f . . . . 
    . . . . . . f 8 8 9 8 f . . . . 
    . . . . . f f 8 9 9 8 f f . . . 
    . . . . . f 8 9 9 9 8 8 f . . . 
    . . . f f 8 9 9 9 1 9 8 f . . . 
    . . f f 8 8 9 9 1 1 9 8 f f . . 
    . f f 8 9 9 9 1 9 1 9 8 8 f . . 
    . f 8 9 9 1 9 9 1 9 9 9 8 f . . 
    . f 8 9 9 9 1 9 1 1 9 9 8 f . . 
    . f 8 8 9 1 1 1 1 1 9 9 8 f . . 
    . f f 8 9 9 1 1 1 1 9 8 8 f . . 
    . . . f 8 9 1 1 1 9 9 8 f f . . 
    `, SpriteKind.Nomnom)
let Flame3 = sprites.create(img`
    . . . . . . f f f . . . . . . . 
    . . . . . . f 8 f f . . . . . . 
    . . . . . . f f 8 f f . f . . . 
    . . . . . . . f 8 8 f . . . . . 
    . . . . . . f f 8 9 8 f . . . . 
    . . . . . . f 8 8 9 8 f . . . . 
    . . . . . f f 8 9 9 8 f f . . . 
    . . . . . f 8 9 9 9 8 8 f . . . 
    . . . f f 8 9 9 9 1 9 8 f . . . 
    . . f f 8 8 9 9 1 1 9 8 f f . . 
    . f f 8 9 9 9 1 9 1 9 8 8 f . . 
    . f 8 9 9 1 9 9 1 9 9 9 8 f . . 
    . f 8 9 9 9 1 9 1 1 9 9 8 f . . 
    . f 8 8 9 1 1 1 1 1 9 9 8 f . . 
    . f f 8 9 9 1 1 1 1 9 8 8 f . . 
    . . . f 8 9 1 1 1 9 9 8 f f . . 
    `, SpriteKind.Nomnom)
let Flame2 = sprites.create(img`
    . . . . . . f f f . . . . . . . 
    . . . . . . f 8 f f . . . . . . 
    . . . . . . f f 8 f f . f . . . 
    . . . . . . . f 8 8 f . . . . . 
    . . . . . . f f 8 9 8 f . . . . 
    . . . . . . f 8 8 9 8 f . . . . 
    . . . . . f f 8 9 9 8 f f . . . 
    . . . . . f 8 9 9 9 8 8 f . . . 
    . . . f f 8 9 9 9 1 9 8 f . . . 
    . . f f 8 8 9 9 1 1 9 8 f f . . 
    . f f 8 9 9 9 1 9 1 9 8 8 f . . 
    . f 8 9 9 1 9 9 1 9 9 9 8 f . . 
    . f 8 9 9 9 1 9 1 1 9 9 8 f . . 
    . f 8 8 9 1 1 1 1 1 9 9 8 f . . 
    . f f 8 9 9 1 1 1 1 9 8 8 f . . 
    . . . f 8 9 1 1 1 9 9 8 f f . . 
    `, SpriteKind.Nomnom)
tiles.placeOnRandomTile(Gasoline2, sprites.dungeon.floorLight2)
tiles.placeOnRandomTile(Gasoline3, sprites.dungeon.floorLight2)
tiles.placeOnRandomTile(Gasoline1, sprites.dungeon.floorLight2)
tiles.placeOnRandomTile(Flame1, sprites.dungeon.floorLight2)
tiles.placeOnRandomTile(Flame2, sprites.dungeon.floorLight2)
tiles.placeOnRandomTile(Flame3, sprites.dungeon.floorLight2)
let portal = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . c c c c c . . . . . 
    . . . . c c c a a a a c c . . . 
    . . . c a a a a a a a a a c . . 
    . . . c a a f f f f f a a c . . 
    . . c a a f f f f f f f a a c . 
    . c a a a f f f f f f f a a c . 
    . c a a a f f f f f f f a a c c 
    . c a a a f f f f f f f a a a c 
    . c a a a f f f f f f f a a a c 
    . . c a a a f f f f f a a a a c 
    . . c c a a a a a a a a a a c . 
    . . . c a a a a a a a a a c . . 
    . . . c c c a a a a c c c . . . 
    . . . . . c c c c c . . . . . . 
    `, Door)
let Portal2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . c c c c c . . . . . 
    . . . . c c c a a a c c c . . . 
    . . . c c a a a a a a a c c . . 
    . . . c a a f f f f f a a c . . 
    . . c c a f f f f f f f a c c . 
    . . c a a f f f f f f f a a c . 
    . . c a a f f f f f f f a a c . 
    . . c a a f f f f f f f a a c . 
    . . c a a f f f f f f f a a c . 
    . . c c a a f f f f f a a c c . 
    . . . c c a a a a a a a c c . . 
    . . . . c c a a a c c c c . . . 
    . . . . . c c c c . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, Doors)
tiles.placeOnRandomTile(portal, sprites.dungeon.floorLight2)
tiles.placeOnRandomTile(Portal2, sprites.dungeon.floorLight2)
randommaze()
