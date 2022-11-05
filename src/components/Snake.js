class Snake {

    constructor(x, y) {
        this.s = [[x - 1, y], [x, y]]
        this.dx = 1
        this.dy = 0
    }

    move(dx = 0, dy = 0, increase = false) {
        if (dx === 0 && dy === 0) {
            dx = this.dx
            dy = this.dy
        }
        
    }

}