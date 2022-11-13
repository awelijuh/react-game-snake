export class Snake {

    constructor(height, width, x, y) {
        this.s = [{x: x - 2, y: y}, {x: x - 1, y: y}, {x: x, y: y}]
        this.dx = 1
        this.dy = 0
        this.height = height
        this.width = width
        this.directionUpdated = false
    }

    isDirectionEquals(dx, dy) {
        return this.dx === dx && this.dy === dy
    }

    updateDirection(dx, dy) {
        if (this.dx === -dx && this.dy === -dy) {
            return false
        }
        if (this.directionUpdated) {
            return false
        }
        this.dx = dx
        this.dy = dy
        this.directionUpdated = true
        return true
    }

    move(dx = 0, dy = 0, increase = false) {
        let cp = Object.assign(Object.create(Object.getPrototypeOf(this)), this)

        cp.s = [...cp.s].map(v => ({...v}))

        if (dx === 0 && dy === 0) {
            dx = cp.dx
            dy = cp.dy
        }

        cp.s.push({
            x: (cp.s.at(-1).x + dx + cp.width) % cp.width,
            y: (cp.s.at(-1).y + dy + cp.height) % cp.height
        })

        if (!increase) {
            cp.s.shift()
        }
        if (typeof increase === "function") {
            if (!increase(cp.s.at(-1))) {
                cp.s.shift()
            }
        }

        cp.directionUpdated = false
        cp.dx = dx
        cp.dy = dy
        return cp
    }

    isFinished() {
        let c = {}
        for (let i in this.s) {
            if (c?.[this.s[i].x]?.[this.s[i].y] != null) {
                return true
            }
            if (c[this.s[i].x] == null) {
                c[this.s[i].x] = {}
            }
            c[this.s[i].x][this.s[i].y] = true
        }

    }

}
