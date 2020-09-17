export class Helper {
  constructor() {

  }


  // 1 is white
  // 0 is black

  static clean(map) {



    for (let x = 1; x < map.length - 1 ; x++) {
      for (let y = 1; y < map[x].length - 1; y++) {

        let counter = 0;
        // look at a 3x3 grid around yourself
        for (let i = x - 1; i <= x + 1; i++) {
          for (let j = y - 1; j <= y + 1; j++) {
            if (map[x][y] !== map[i][j]) {
              if (map[x][y].val === map[i][j].val) {
                counter++;
              }
            }
          }
        }

        if (counter < 4) {
          if (map[x][y].val === 0) {
            map[x][y].val = 1;
          } else {
            map[x][y].val = 0;
          }

        }

      }
    }


    for (let x = 1; x < map.length - 1 ; x++) {
      for (let y = 1; y < map[x].length - 1; y++) {

        let counter = 0;
        // look at a 3x3 grid around yourself
        for (let i = x - 1; i <= x + 1; i++) {
          for (let j = y - 1; j <= y + 1; j++) {
            if (map[x][y] !== map[i][j]) {
              if (map[x][y].val === map[i][j].val) {
                counter++;
              }
            }
          }
        }

        if (counter <= 2) {
          if (map[x][y].val === 0) {
            map[x][y].val = 1;
          } else {
            map[x][y].val = 0;
          }

        }

      }
    }



    return map;
  }



}
