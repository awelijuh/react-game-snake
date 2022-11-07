import {FIELD_SIZE} from "./Const";

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


export function createEmptyField() {
    let field = []

    for (let i = 0; i < FIELD_SIZE; i++) {
        field.push([])
        for (let j = 0; j < FIELD_SIZE; j++) {
            field[i].push(0)
        }
    }
    return field
}

export function createFieldWithSnake(snake, point) {
    let field = createEmptyField()
    for (let i in snake) {
        field[snake[i].x][snake[i].y] = 1
    }
    field[snake.at(-1).x][snake.at(-1).y] = 2
    field[snake[0].x][snake[0].y] = 4
    field[point.x][point.y] = 3
    return field
}


export function generatePoint(s) {
    let field = createEmptyField()

    for (let i in s) {
        field[s[i].x][s[i].y] = 1
    }
    let free = []

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === 0) {
                free.push({
                    x: i,
                    y: j
                })
            }
        }
    }

    return free[getRndInteger(0, free.length)]
}
