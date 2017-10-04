class Utilities {

    //Checks for collision between two rectangles
    static isColliding(objA, objB) {
        let left   = objA.start_x < objB.end_x;
        let rigth  = objA.end_x > objB.start_x;
        let top    = objA.start_y < objB.end_y;
        let bottom = objA.end_y > objB.start_y;
        return left && rigth && top && bottom;
    }

    static willColideWith(x, y, width, height, objB) {
        let left   = x < objB.end_x;
        let right  = (x + width) > objB.start_x;
        let top    = y < objB.end_y;
        let bottom = (y + height) > objB.start_y;
        return left && right && top && bottom;
    }

    static getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}