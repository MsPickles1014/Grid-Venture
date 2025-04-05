const predefinedGrid = [
    ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock'],
    ['tree', 'tree', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'tree', 'path', 'path', 'path', 'path', 'cave', 'cave', 'cave', 'cave', 'rock'],
    ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'secret', 'tree', 'path', 'tree', 'tree', 'rock', 'cave', 'cave', 'cave', 'cave', 'rock'],
    ['tree', 'tree', 'tree', 'tree', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'tree', 'tree', 'rock', 'cave', 'cave', 'cave', 'cave', 'rock'],
    ['tree', 'tree', 'tree', 'tree', 'log', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree', 'tree', 'rock', 'cave', 'cave', 'cave', 'cave', 'rock'],
    ['tree', 'tree', 'path', 'path', 'path', 'path', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree', 'tree', 'rock', 'cave', 'cave', 'cave', 'cave', 'rock'],
    ['tree', 'tree', 'path', 'rock', 'rock', 'path', 'tree', 'tree', 'tree', 'rock', 'rock', 'path', 'tree', 'tree', 'rock', 'cave', 'cave', 'cave', 'cave', 'rock'],
    ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'rock', 'rock', 'rock', 'key', 'rock', 'path', 'tree', 'tree', 'rock', 'rock', 'rock', 'rock', 'cave', 'rock'],
    ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'cave', 'cave', 'cave', 'cave', 'rock', 'path', 'tree', 'tree', 'tree', 'tree', 'tree', 'rock', 'rock', 'rock'],
    ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'cave', 'cave', 'cave', 'cave', 'rock', 'path', 'path', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
    ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'cave', 'cave', 'cave', 'cave', 'rock', 'rock', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'tree'],
    ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'rock', 'rock', 'cave', 'cave', 'cave', 'rock', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree'],
    ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'rock', 'rock', 'cave', 'rock', 'rock', 'rock', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree'],
    ['tree', 'tree', 'path', 'rock', 'rock', 'cave', 'cave', 'cave', 'cave', 'cave', 'cave', 'rock', 'tree', 'path', 'path', 'path', 'path', 'tree', 'path', 'tree'],
    ['tree', 'tree', 'path', 'path', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'tree', 'path', 'tree', 'tree', 'path', 'tree', 'path', 'tree'],
    ['tree', 'tree', 'tree', 'path', 'secret', 'secret', 'secret', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree', 'tree', 'path', 'tree', 'path', 'tree'],
    ['tree', 'tree', 'tree', 'path', 'tree', 'tree', 'secret', 'tree', 'tree', 'path', 'path', 'path', 'path', 'path', 'tree', 'tree', 'path', 'tree', 'path', 'tree'],
    ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'secret', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree', 'tree', 'path', 'path', 'path', 'tree'],
    ['tree', 'tree', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'path', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
    ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
  ];
  // Manually place locked chest
  predefinedGrid[13][10] = 'lockedChest';
  predefinedGrid[9][11] = 'rockslide';   // y: 9, x: 11
  predefinedGrid[7][18] = 'pickaxe';     // y: 7, x: 18
  predefinedGrid[7][9] = 'key'; // Correctly places the key

export default predefinedGrid;